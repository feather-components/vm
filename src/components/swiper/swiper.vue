<template>
    <div :class="classes">
        <div 
            class="vm-swiper-inner" 
            ref="inner"
            v-draggable="draggableOptions"
            @drag:start="onDragStart"
            @draging="onDraging"
            @drag:end="onDragEnd"
        >
            <slot></slot>
        </div>

        <div class="vm-swiper-indicators">
            <i 
                v-for="a of max" :key="a"
                :class="{
                    'vm-swiper-indicator': true,
                    'vm-swiper-indicator-active': a == index + 1
                }"
                :style="{
                    background: a == index + 1 ? indicatorActiveColor : indicatorColor
                }"
            >
            </i>
        </div>
    </div>
</template>

<script>
import Draggable from '../../directives/draggable';
import {Event, Dom, Util} from '../../helper';
import Config from '../../config';

export default {
    name: 'swiper',

    directives: {
        Draggable
    },

    props: {
        axis: {
            type: String,
            default: 'x'
        },

        ratio: {
            type: Number,
            default: 0.25
        },

        defaultIndex: {
            type: Number,
            default: 0
        },

        autoplay: {
            type: Boolean,
            default: true
        },

        interval: {
            type: Number,
            default: 5000
        },

        indicatorDots: {
            type: Boolean,
            default: true
        },

        indicatorColor: {
            type: String,
            default () {
                return Config('swiper.indicator-color');
            }
        },

        indicatorActiveColor: {
            type: String,
            default () {
                return Config('swiper.indicator-active-color') || Config('theme');
            }
        }
    },

    data () {
        return {
            fxing: false,
            max: 0,
            min: 0,
            index: null,
            draggableOptions: {
                axis: this.axis,
                canDrag: this.canDrag
            }
        };
    },

    computed: {
        classes () {
            return ['vm-swiper', `vm-swiper-${this.axis}`, this.fxing ? 'vm-swiper-fxing' : ''];
        }
    },

    mounted () {
        this.$nextTick(() => {
            Event.on(
                this.$inner = this.$refs.inner, 
                'transitionend webkitTransitionEnd', 
                this.complete.bind(this)
            );

            this.max = this.$inner.children.length;
            this.to(this.defaultIndex, false, true);
        });
    },

    updated () {
        this.max = this.$inner.children.length;
    },

    activated () {
        this.autoPlay();
    },

    deactivated () {
        this.cancelAutoPlay();
    },

    methods: {
        autoPlay () {
            if (!this.autoplay || this._$autoid) return false;

            this._$autoid = setTimeout(() => {
                this.to(this.index + 1 == this.max ? 0 : this.index + 1);
            }, this.interval);
        },

        cancelAutoPlay () {
            if (!this._$autoid) return false;
            
            clearTimeout(this._$autoid);
            this._$autoid = null;
        },

        onDragStart (event) {
            this.cancelAutoPlay();
            this.fxing = false;
            this.min = -(this.max - 1) * this.getDocumentSize();
            this.$emit('drag:start');
        },

        onDraging (event) {
            this.isMoving = true;
            this.$emit('draging', event);
        },

        onDragEnd (event) {
            if (!this.isMoving) {
                return false;
            }

            this.isMoving = false;

            let start = -this.$inner.children[this.index][this.axis == 'x' ? 'offsetLeft' : 'offsetTop'];
            let end = event.data[this.axis];
            let moved = end - start;
            let index = this.index + (Math.abs(moved) / this.getDocumentSize() < this.ratio ? 0 : moved > 0 ? -1 : 1);

            this.$emit('drag:end');
            this.to(index);
        },

        to (index, fx = true, untrigger = false) {
            var offset = index * this.getDocumentSize();

            if (index == this.index) {
                this.$emit('reject', index);
            } else {
                var oldIndex = this.index;

                this.index = index;
                !untrigger && this.$emit('switch', this.index, oldIndex);
            }

            this.fxing = fx;
            Dom.css(this.$inner, 'transform', `translate${this.axis.toUpperCase()}(-${offset}px)`);
            !fx && this.complete();
        },

        complete () {
            this.fxing = false;
            this.$emit('switch:complete', this.index);
            this.autoPlay();
        },

        canDrag (info) {
            var offset = info[this.axis];

            return offset > this.min && offset < 0;
        },

        getDocumentSize () {
            return this.axis == 'x' ? Dom.width(document) : Dom.height(document);
        }
    }
};
</script>

<style lang="less">
.vm-swiper {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.vm-swiper-indicators {
    position: absolute;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vm-swiper-y {
    height: 100%;

    .vm-swiper-indicators {
        flex-direction: column;
        height: 100%;
        width: 30px;
        right: 0px;
        top: 0px;
    }

    .vm-swiper-indicator {
        margin: 3px 0px;
    }

    .vm-swiper-indicator-active {
        height: 12px;
    }
}

.vm-swiper-x {
    .vm-swiper-indicators {
        width: 100%;
        height: 30px;
        bottom: 0px;
    }

    .vm-swiper-indicator {
        margin: 0px 3px;
    }

    .vm-swiper-indicator-active {
        width: 12px;
    }
}

.vm-swiper-indicator {
    opacity: 0.9;
    width: 6px;
    height: 6px;
    border-radius: 100px;
    display: inline-block;
    transition: background .5s ease;
    -webkit-transition: background .5s ease;
}

.vm-swiper-inner {
    display: flex;
    flex-flow: row;
    align-items: flex-start;
    margin-top: 0px;
    width: 100000000000px;
}

.vm-swiper-y .vm-swiper-inner {
    flex-flow: column;
    width: auto;
    height: 10000000000px;
}

.vm-swiper-fxing .vm-swiper-inner {
    transition: transform .5s ease;
    -webkit-transition: transform .5s ease;
}
</style>