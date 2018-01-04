<template>
    <div :class="'vm-scroll vm-scroll-' + axis" @scroll="onScroll">
        <div ref="inner" class="vm-scroll-inner" @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd">
            <slot name="header"></slot>
            <slot></slot>
            <slot name="footer"></slot>
        </div>

        <div class="vm-scroll-bar" ref="bar" v-if="scrollbars" v-show="barVisible" :class="{'vm-scroll-bar-transition': !!fxer}"></div>
    </div>
</template>

<style lang="less">
    .vm-scroll{
        position: relative;
        width: 100%;

        .vm-scroll-bar-transition{
            transition-property: transform;
            -webkit-transition-property: -webkit-transform;
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
                type: Function,
                default(k){
                    return Math.sqrt(1 - (--k * k));
                }
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
                fxer: false,
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

            self.axis == 'y' && (this.$autosize = new Autosize.AutoSize(self.$el, self));
            self.$actived = true;

            Util.observer(self.$refs.inner, {
                childList: true,
                subtree: true
            }, (mutations) => {
                self.refresh();
            });

            Event.on(window, 'resize', () => {
                self.refresh();
            });

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
                self.base = Draggable.Draggable.getTransform(self.$refs.inner)[self.axis];
            },

            onDragStart(event){
                var self = this;

                self.scrollEnd();
                self.refresh();
                self.$emit('drag:start', event.data[self.axis]);
            },

            onDraging(event){
                var self = this;

                self.isMoving = true;

                var duration = Date.now() - self.baseTime, 
                    translate = event.data[self.axis],
                    stack = 1;

                duration >= 300 && self.resetBase();
                self.$emit('draging', translate); 
                self.scrollTo(translate);
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
                }else if(duration < 300){
                    var distance = event.data[self.axis] - self.base;
                    var speed = Math.abs(distance) / duration, deceleration = 0.0006;
                    var destination = translate + Math.pow(speed, 2) / (2 * 0.0006) * (distance < 0 ? -1 : 1);

                    if(destination < self.min){
                        destination = self.min;
                    }else if(destination > 0){
                        destination = 0;
                    }

                    duration = speed / deceleration / 2;
                    duration > 300 && self.scrollTo(destination, duration);
                }

                self.$emit('drag:end', translate, destination, duration);
                self.baseTime = null;
                self.distance = null;
                self.base = null;
            },

            scrollTo(destination, duration = 0, limitMaxOrMin = false){
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
                    Dom.css(self.$refs.inner, 'transform', 'translate' + this.axi + '(' + destination + 'px)');
                    self.$emit('scrolling', destination);
                }else{
                    this.fx(self.$refs.inner, destination, duration);
                }

                self.scrollBarTo(destination, duration);
            },

            scrollBarTo(destination, duration = 0){
                var self = this;

                if(self.scrollbars && self.eSize && self.iSize){
                    self.barVisible = true;
                    clearTimeout(self.bartid);
                    self.bartid = setTimeout(() => {
                        self.barVisible = false;
                    }, 3000);
                    
                    var translate = self.eSize * (destination / self.iSize) * -1;

                    Dom.css(self.$refs.bar, {
                        'transform': 'translate' + this.axi + '(' + translate  + 'px)',
                        'transition-duration': duration
                    });
                }
            },

            fx(element, end, duration){
                var self = this;

                self.scrollEnd();
                var startTime = Date.now(), endTime = startTime + duration;
                var start = self.pos, range = end - start;

                function step(){
                    var now = Date.now();

                    if(now >= endTime){
                        self.scrollTo(end);
                        self.scrollEnd(); 
                    }else{
                        var target = parseInt(parseInt(start) + self.ease((now - startTime) / duration) * range);
                        self.scrollTo(target);
                        self.fxer = Util.rfa(step);
                    }
                }

                self.fxer = Util.rfa(step);
            },

            scrollEnd(){
                var self = this;

                if(!self.fxer || !this.$actived) return;

                Util.crfa(self.fxer);
                self.fxer = false;

                self.$emit('scroll:end', self.pos);
            },

            limitType(){
                return this.pos >= this.max ? 1 : (this.pos <= this.min ? -1 : 0);
            },

            getPos(){
                return this.pos;
            },
        },

        activated(){
            if(!this.$autosize){
                return false;
            }

            this.$actived = true;
            this.$autosize.resize();
            this.$autosize.observer();
        },

        deactivated(){
            if(!this.$autosize){
                return false;
            }
            
            this.$actived = false;
            this.$autosize.unobserver();
        }
    }
</script>