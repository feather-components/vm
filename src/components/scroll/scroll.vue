<template>
    <div :class="'vm-scroll vm-scroll-' + axis" @scroll="onScroll" v-autosize="{enable: axis == 'y'}">
        <div ref="inner" class="vm-scroll-inner" @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd">
            <slot name="header"></slot>
            <div class="vm-scroll-content">
                <slot></slot>
            </div>
            <slot name="footer"></slot>
        </div>

        <div class="vm-scroll-bar" ref="bar" v-if="scrollbars" v-show="barVisible"></div>
    </div>
</template>

<style lang="less">
    .vm-scroll{
        position: relative;
        width: 100%;

        .vm-scroll-content{
            overflow: hidden;
        }

        .vm-scroll-bar{
            position: absolute;
            border-radius: 5px;
            background: #ccc;
        }
    }

    .vm-scroll-y{
        overflow: hidden;
        & > .vm-scroll-bar{
            right: 0px;
            width: 2px;
            height: 0px;
            top: 0px;
        }

        .vm-scroll-inner{
            min-height: 100%; 
        }  
    }

    .vm-scroll-x{
        overflow-x: hidden;
        overflow-y: auto;
        _height: 1%;

        & > .vm-scroll-bar{
            height: 2px;
            width: 0px;
            left: 0px;
            bottom: 0px;
        }

        & > .vm-scroll-inner{
            float: left;
            white-space: nowrap;
        }
    }
</style>

<script>
    import Autosize from '../../directives/autosize';
    import Draggable from '../../directives/draggable';
    import {Dom, Util, Event} from '../../helper';

    export default{
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

            ease: {
                type: String,
                default: 'cubic-bezier(0.1, 0.57, 0.1, 1)'
            },

            ignores: {
                type: [RegExp, Function, String],
                default: null
            },

            maxPos: {
                type: Number,
                default: null
            },

            minPos: {
                type: Number,
                default: null
            }
        },

        directives: {
            Autosize
        },

        data(){
            return {
                barVisible: false,
                axi: this.axis.toUpperCase(),
                fillSize: this.axis != 'x'
            }
        },

        mounted: function(){   
            var self = this;

            self.pos = 0;
            self.$drag = new Draggable.Draggable(self.$refs.inner, {
                axis: self.axis,
                ignores: self.ignores,
                canDrag: (info) => {
                    return !!self.eSize;
                }
            });
            
            Dom.css(self.$refs.inner, 'transition-timing-function', self.ease);

            Event.on(self.$refs.inner, 'transitionend webkitTransitionEnd', () => {
                self.scrollEnd();
            });

            Util.observer(self.$refs.inner, {
                childList: true,
                subtree: true
            }, (mutations) => {
                self.refresh();
            });

            Event.on(window, 'resize', () => {
                self.refresh();
            });

            self.$actived = true;
            self.refresh();
        },

        methods: {
            onScroll(){
                var self = this;

                if(self.$el.scrollTop && self.axis == 'y'){
                    self.scrollTo(-self.$el.scrollTop);
                    self.$el.scrollTop = 0;
                }
            },

            refresh(){
                var self = this;
                var method = self.axis == 'x' ? 'width' : 'height';

                var s1 = self.eSize = Dom[method](self.$el);
                var s2 = self.iSize = Dom[method](self.$refs.inner);

                self.max = self.maxPos != null ? self.maxPos : 0;
                self.min = self.minPos != null ? self.minPos : Math.min(0, s1 - s2);

                if(self.scrollbars && s1 && s2){
                    self.barPercent = s1 / Math.max(s1, s2);
                    Dom.css(self.$refs.bar, method, 100 * self.barPercent + '%');
                }

                self.resetBase();
                self.base < self.min && self.scrollTo(self.min, 300);
            },

            resetBase(){ 
                var self = this;
                self.baseTime = Date.now();
                self.base = self.getComputedPos();
            },

            onDragStart(event){
                var self = this, translate = self.pos = event.data[self.axis];

                self.isMoving = true;
                self.scrollEnd();
                self.scrollBarTo(translate);
                self.refresh();
                self.$emit('drag:start', translate);
            },

            onDraging(event){
                var self = this;
                var duration = Date.now() - self.baseTime, 
                    translate = event.data[self.axis],
                    stack = 1;

                duration >= 300 && self.resetBase();
                self.$emit('draging', translate); 
                self.scrollTo(translate, 0, false, true);
                self.$drag.stack(translate >= self.max || translate <= self.min ? 3 : 1);
            },

            onDragEnd(event){
                var self = this;

                if(!self.isMoving) return false;
                self.isMoving = false;
                
                var duration = Date.now() - self.baseTime, destination,
                    translate = self.pos = event.data[self.axis];

                if(translate >= self.max){
                    self.scrollTo(destination = self.max, duration = (translate - self.max) * 5);
                }else if(translate > 0 && translate < self.max){
                    self.scrollTo(destination = 0, duration = translate * 3);
                }else if(translate <= self.min){ 
                    self.scrollTo(destination = self.min, duration = (self.min - translate) * 5);
                }else if(duration < 200){
                    var distance = event.data[self.axis] - self.base;
                    var speed = Math.abs(distance) / duration, deceleration = 0.0006;
                    var destination = translate + Math.pow(speed, 3) / (2 * 0.0006) * (distance < 0 ? -1 : 1);

                    if(destination < self.min){
                        destination = self.min;
                        duration = Math.abs(destination - translate) / speed;
                    }else if(destination > 0){
                        destination = 0;
                        duration = Math.abs(destination - translate) / speed;
                    }else{
                        duration = speed / deceleration;
                    }

                    self.scrollTo(destination, duration * 4);
                }

                self.$emit('drag:end', translate, destination, duration);
                self.baseTime = null;
                self.distance = null;
                self.base = null;
            },

            scrollTo(destination, duration = 0, limitMaxOrMin = false, notSetTransform = false){
                var self = this;

                if(limitMaxOrMin){
                    if(destination >= self.max){
                        destination = self.max;
                    }else if(destination <= self.min){
                        destination = self.min;
                    }
                }

                if(!duration){ 
                    self.pos = destination;
                    !notSetTransform && self.translateTo(self.$refs.inner, destination);
                    self.$emit('scrolling', destination);
                }else if(self.isMoving){
                    return false;
                }else{
                    self.translateTo(self.$refs.inner, self.pos = destination, duration);
                    //解决scrolling时无法获取translate的问题
                    self.listenScrolling();
                }

                self.scrollBarTo(destination, duration);
            },

            scrollToElement(el, duration, limitMaxOrMin){
                var eOffset = Dom.offset(el), offset = Dom.offset(this.$el);
                var prop = this.axi == 'X' ? 'left' : 'top';
                this.refresh();
                this.scrollTo(offset[prop] - eOffset[prop], duration, limitMaxOrMin);
            },

            scrollBarTo(destination, duration = 0){
                var self = this;

                if(self.scrollbars && self.eSize && self.iSize){
                    self.barVisible = true;
                    clearTimeout(self.bartid);
                    self.bartid = setTimeout(() => {
                        self.barVisible = false;
                    }, 3000);
                    
                    self.translateTo(self.$refs.bar, self.eSize * (destination / self.iSize) * -1, duration);
                }
            },

            listenScrolling(){
                var self = this;

                function trigger(){
                    //Util.log(Math.random());
                    if(self.fxer){
                        self.$emit('scrolling', self.pos = self.getComputedPos());
                        self.fxer = setTimeout(trigger, 50);
                    }
                }

                self.fxer = setTimeout(trigger, 50);
            },

            scrollEnd(){
                var self = this;

                if(!self.fxer || !this.$actived) return;

                clearTimeout(self.fxer);
                self.fxer = false;
                self.pos = self.getComputedPos();
                self.translateTo(self.$refs.inner, self.pos);
                self.$emit('scroll:end', self.pos);
            },

            limitType(){
                return this.pos >= this.max ? 1 : (this.pos <= this.min ? -1 : 0);
            },

            getPos(){
                return this.pos;
            },

            translateTo(el, translate, duration = 0){
                Dom.css(el, {
                    'transition-duration': `${duration}ms`,
                    'transform': 'translate3d(' 
                            + (this.axi == 'X' ? translate + 'px' : '0px') + ','
                            + (this.axi == 'Y' ? translate + 'px' : '0px') + ','
                            + '0px)'
                });
            },

            getComputedPos(){
                return Draggable.Draggable.getTransform(this.$refs.inner)[this.axis];
            }
        },

        activated(){
            this.$actived = true;

            if(!this.$autosize){
                return false;
            }
                
            //this.$autosize.resize(false);
            this.$autosize.observer();
        },

        deactivated(){
            this.$actived = false;

            if(!this.$autosize){
                return false;
            }

            this.$autosize.unobserver();
        }
    }
</script>