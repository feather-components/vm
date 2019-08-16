<template>
    <div :class="'vm-scroll vm-scroll-' + axis" @scroll="onNativeScroll" v-autosize="{enable: axis == 'y'}">
        <div ref="inner" class="vm-scroll-inner"
            v-draggable="{
                axis: axis,
                stick: stick,
                ignores: ignores,
                canDrag: canDrag
            }"
            @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd"
        >
            <slot name="header"></slot>
            <div class="vm-scroll-content">
                <slot></slot>
            </div>
            <slot name="footer"></slot>
        </div>

        <div class="vm-scrollbars" ref="bar" v-if="scrollbars" v-show="barVisible"></div>
    </div>
</template>

<script>
import Autosize from '../../directives/autosize';
import Draggable from '../../directives/draggable';
import {Dom, Util, Event} from '../../helper';
import Config from '../../config';

const FUNCTIONS = {
    ease: {
        style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
        fn (k) {
            return Math.sqrt( 1 - ( --k * k ) );
        }
    },

    back: {
        style: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)',
        fn (k) {
            var b = 4;
            return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
        } 
    }
};

export default {
    name: 'scroll',

    props: {
        scrollbars: {
            type: Boolean,
            default: false
        },

        axis: {
            type: String,
            default: 'y'
        },

        ignores: {
            type: [RegExp, Function, String],
            default: Config('scroll.ignores')
        },

        boundary: {
            type: Array,
            default () {
                return [0, 0];
            }
        },

        disabled: {
            type: Boolean,
            default: false
        },

        useTransform: {
            type: Boolean,
            default: Config('scroll.use-transform')
        }
    },

    directives: {
        Autosize,
        Draggable
    },

    provide () {
        return {
            _$scroller: this
        };
    },

    data () {
        return {
            stick: 1,
            barVisible: false
        };
    },

    mounted () {
        this.pos = 0;
        this.$actived = true;
        this.initEvents();
        this.$nextTick(() => this.refresh());
    },

    methods: {
        initEvents () {
            Event.on(this.$refs.inner, 'transitionend webkitTransitionEnd', () => {
                this.triggerScrollEnd();
            });

            Util.observer(this.$refs.inner, {
                childList: true,
                subtree: true
            }, () => {
                this.refresh();
            });

            Event.on(window, 'resize', () => {
                this.refresh();
            });
        },

        canDrag () {
            return !!this.eSize && !this.disabled;
        },

        refresh () {
            let style = this.axis == 'x' ? 'width' : 'height';
            let s1 = this.eSize = Dom[style](this.$el);
            let s2 = this.iSize = Dom[style](this.$refs.inner);

            this.maxPos = this.boundary[0] || 0;
            this.minPos = Math.min(0, s1 - s2) - (this.boundary[1] || 0);

            if (this.scrollbars && s1 && s2) {
                Dom.css(this.$refs.bar, style, 100 * (s1 / Math.max(s1, s2)) + '%');
            }

            this.basePos < this.minPos && this.scrollTo(-this.minPos, 300);
        },

        resetBase (time, pos) {
            this.baseTime = time || Date.now();
            this.basePos = pos || this.getComputedPos();
        },
        
        onNativeScroll () {
            let name = this.axis == 'y' ? 'scrollTop' : 'scrollLeft';

            if (!this.$el[name]) return false;

            this.scrollTo(this.$el[name]);
            this.$el[name] = 0;
        },
        
        onDragStart (event) {
            let pos = this.pos = event.data[this.axis];

            this.cancel();
            this.refresh();
            this.resetBase();
            this.now = Date.now();
            this.direction = 0;
            this.$emit('drag:start', pos);
        },

        onDraging (event) {
            let now = Date.now(), pos = event.data[this.axis];
            let duration = now - this.now;

            if (pos > this.pos) {
                this.direction == -1 && this.resetBase(now, pos);
                this.direction = 1;
            } else if (pos < this.pos) {
                this.direction == 1 && this.resetBase(now, pos);
                this.direction = -1;
            } else if (duration > 100) {
                this.resetBase(now, pos);
            }

            this.draging = true;
            this.now = now;
            this.stick = pos >= this.maxPos || pos <= this.minPos ? 3 : 1;
            this.triggerScrolling(pos);
            this.scrollBarTo(pos);
            this.$emit('draging', pos);
        },

        onDragEnd (event) {
            if (!this.draging) return false;
            
            this.draging = false;
    
            let now = Date.now(), target = this.pos, fn = 'ease';
            let duration = 1000;
            let unt = false;
            
            if (this.pos >= this.maxPos) {
                target = this.maxPos;
            } else if (this.pos > 0 && this.pos < this.maxPos) {
                target = 0;
            } else if (this.pos <= this.minPos) {
                target = this.minPos;
            } else if (now - this.now < 50) {
                let distance = this.pos - this.basePos;
                let speed = Math.max(0.1, Math.min(1.2, Math.abs(distance) / (now - this.baseTime))); 
                const deceleration = 0.0006;

                target = Math.round(this.pos + Math.pow(speed, 2) / (2 * deceleration) * (distance < 0 ? -1 : 1));
                duration = 2 * speed / deceleration;

                if (target < this.minPos || target > 0) {
                    let f = target < this.minPos ? this.minPos : 0;
                    duration = Math.max(300, duration * Math.abs(f - this.pos) / Math.abs(this.pos - target));
                    target = f;
                    fn = duration < 1500 ? 'back' : 'ease';
                }
            } else {
                unt = true;
            }

            this.$emit('drag:end', this.pos, target, duration);
            !unt && this.translateTo(target, duration, fn);
        },

        triggerScrolling (pos) {
            this.$emit('scrolling', this.pos = pos);
        },

        scrollTo (pos, duration = 0, limit = false, fn) {
            if (this.draging) return false;

            if (limit) {    
                pos = Math.max(this.minPos, Math.min(pos, this.maxPos));
            }

            this.cancel();
            this.translateTo(pos, duration, fn);
        },

        scrollToElement (el, duration, limit, fn) {
            let eOffset = Dom.offset(el); let offset = Dom.offset(this.$el);
            let prop = this.axis ? 'left' : 'top';

            this.refresh();
            this.scrollTo(eOffset[prop] - offset[prop], duration, limit, fn);
        },

        cancel () {
            this.baseTime = null;
            this.basePos = null;

            if (!this.$fx || !this.$actived) return;
            
            this.useTransform ? clearTimeout(this.$fx) : Util.crfa(this.$fx);
            this.$fx = null;

            const pos = this.getComputedPos();

            this.useTransform && this.translateByC3(this.$refs.inner, pos);
            this.scrollBarTo(pos);
            this.$emit('scroll:cancel');
            this.triggerScrollEnd();
        },

        triggerScrollEnd () {
            this.$emit('scroll:end', this.pos);
        },

        translateTo (pos, duration, fn = 'ease') {
            this.$emit('translate', pos, duration);

            if (!duration) {
                this.translateByC3(this.$refs.inner, pos, duration, fn);
                this.triggerScrolling(pos);
            } else if (this.useTransform) {
                this.translateByC3(this.$refs.inner, pos, duration, fn);

                let f = () => {
                    if (this.$fx) {
                        this.triggerScrolling(this.getComputedPos());
                        this.$fx = setTimeout(f, 50);
                    }
                };
                
                this.$fx = setTimeout(f, 50);
            } else {
                let now = Date.now();
                let tp = this.pos;
                let range = pos - this.pos;

                let f = () => {
                    let a = Date.now() - now;

                    if (a >= duration) {
                        this.translateByC3(this.$refs.inner, pos);
                        this.triggerScrolling(pos);
                        this.triggerScrollEnd();
                    } else {
                        let p = tp + FUNCTIONS[fn].fn(a / duration) * range;
                        this.translateByC3(this.$refs.inner, p);
                        this.$fx = Util.rfa(f);
                        this.triggerScrolling(p);
                    }
                };
                
                this.$fx = Util.rfa(f);
            }
            
            this.scrollBarTo(pos, duration, fn);
        },

        scrollBarTo (pos, duration = 0, fn) {
            if (this.scrollbars && this.eSize && this.iSize) {
                this.barVisible = true;
                clearTimeout(this.bartid);
                this.bartid = setTimeout(() => {
                    this.barVisible = false;
                }, 3000);

                this.translateByC3(this.$refs.bar, this.eSize * (pos / this.iSize) * -1, duration, fn, true);
            }
        },

        translateByC3 (el, pos, duration = 0, fn = 'ease', useTransform = this.useTransform) {
            useTransform && Dom.css(el, {
                'transition-duration': `${duration}ms`,
                'transition-timing-function': fn === false && !duration ? '' : FUNCTIONS[fn].style
            });

            Dom.css(el, 'transform', `translate${this.axis.toUpperCase()}(${pos}px) translateZ(0px)`);
        },

        getComputedPos () {
            return Dom.getTransform(this.$refs.inner)[this.axis];
        },

        limitType () {
            return this.isAtTop() ? 1 : (this.isAtBottom() ? -1 : 0);
        },

        isAtBottom () {
            return this.pos <= this.minPos;
        },

        isAtTop () {
            return this.pos >= this.maxPos;
        },

        getPos () {
            return this.pos;
        }
    },

    activated () {
        this.$actived = true;
    },

    deactivated () {
        this.$actived = false;
    }
};
</script>

<style lang="less">
.vm-scroll {
    position: relative;
    width: 100%;

    .vm-scroll-content {
        overflow: hidden;
    }

    .vm-scrollbars {
        position: absolute;
        border-radius: 5px;
        background: #ccc;
    }
}

.vm-scroll-y {
    overflow: hidden;

    & > .vm-scrollbars {
        right: 0px;
        width: 2px;
        height: 0px;
        top: 0px;
    }

    .vm-scroll-inner {
        min-height: 100%;
        -webkit-backface-visibility: hidden;
        -webkit-transform-style: preserve-3d;
    }
}

.vm-scroll-x {
    overflow-x: hidden;
    overflow-y: auto;
    _height: 1%;

    & > .vm-scrollbars {
        height: 2px;
        width: 0px;
        left: 0px;
        bottom: 0px;
    }

    & > .vm-scroll-inner {
        float: left;
        white-space: nowrap;
    }
}
</style>