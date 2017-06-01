<template>
    <div :class="'vmui-scroll vmui-scroll-' + axis" v-autosize="{fill: fillSize}">
        <div ref="inner" class="vmui-scroll-inner" @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd">
            <div class="vmui-scroll-pulldown" ref="pulldown" v-if="axis == 'y'">
                <slot name="pulldown"></slot>
            </div>
            <slot></slot>
        </div>

        <div class="vmui-scroll-bar" ref="bar" v-if="scrollbars" v-show="barVisible" :class="{'vmui-scroll-bar-transition': !!fxer}"></div>
    </div>
</template>

<style>
    .vmui-scroll{
        position: relative;
        width: 100%;

        .vmui-scroll-bar-transition{
            transition-property: transform;
            -webkit-transition-property: -webkit-transform;
        }

        .vmui-scroll-bar{
            position: absolute;
            border-radius: 5px;
            background: #ccc;
        }
    }

    .vmui-scroll-y{
        overflow: hidden;

        & > .vmui-scroll-bar{
            right: 0px;
            width: 2px;
            height: 0px;
            top: 0px;
        }
    }

    .vmui-scroll-x{
        overflow-x: hidden;
        overflow-y: auto;
        _height: 1%;

        & > .vmui-scroll-bar{
            height: 2px;
            width: 0px;
            left: 0px;
            bottom: 0px;
        }

        & > .vmui-scroll-inner{
            float: left;
        }
    }

    .vmui-scroll-pulldown{
        width: 100%;
        position: absolute;
        transform: translateY(-100%);
        -webkit-transform: translateY(-100%);
    }
</style>

<script>
    import Autosize from '../../directives/autosize';
    import Draggable from '../../directives/draggable';
    import {Dom, Util} from '../../helper';

    export default{
        name: 'vm-scroll',

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

            self.$drag = new Draggable.Draggable(self.$refs.inner, {
                axis: self.axis,
                canDrag: (info) => {
                    return !!self.eSize;
                }
            });

            Util.observer(self.$refs.inner, {
                childList: true,
                subtree: true
            }, () => {
                self.refresh();
            });
        },

        methods: {
            refresh(){
                var self = this;
                var method = self.axis == 'x' ? 'width' : 'height';

                var s1 = self.eSize = Dom[method](self.$el);
                var s2 = self.iSize = Dom[method](self.$refs.inner);

                self.max = self.axis == 'y' ? Dom[method](self.$refs.pulldown) : 0;
                self.min = Math.min(0, s1 - s2);
                
                if(self.scrollbars && s1 && s2){
                    self.barPercent = s1 / Math.max(s1, s2);
                    Dom.css(self.$refs.bar, method, 100 * self.barPercent + '%');
                }
            },

            resetBase(){ 
                var self = this;
                self.baseTime = Date.now();
                self.base = Draggable.Draggable.getTransform(self.$refs.inner)[self.axis];
            },

            onDragStart(event){
                var self = this;

                self.scrollEnd();
                self.resetBase();
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

                if(translate >= self.max){
                    self.$emit('drag:limit', translate, 1);
                    stack = 3;
                }else if(translate <= self.min){
                    self.$emit('drag:limit', translate, -1);
                    stack = 3;
                }else{
                    self.$emit('drag:normal', translate);
                }

                self.scrollBarTo(translate);
                self.$drag.stack(stack);
            },

            onDragEnd(event){
                var self = this;

                if(!self.isMoving) return false;
                self.isMoving = false;

                var duration = Date.now() - self.baseTime,
                    translate = self.pos = event.data[self.axis];

                if(translate >= self.max){
                    self.scrollTo(self.max, (translate - self.max) * 3);
                }else if(translate > 0 && translate < self.max){
                    self.scrollTo(0, translate * 3);
                }else if(translate <= self.min){ 
                    self.scrollTo(self.min, 300);
                }else if(duration < 300){
                    var distance = event.data[self.axis] - self.base;
                    var speed = Math.abs(distance) / duration, deceleration = 0.0006;
                    var destination = translate + Math.pow(speed, 2) / (2 * 0.0006) * (distance < 0 ? -1 : 1);

                    if(destination < self.min){
                        destination = self.min;
                    }else if(destination > 0){
                        destination = 0;
                    }

                    duration = speed / deceleration;
                    duration > 300 && self.scrollTo(destination, duration);
                }

                self.$emit('drag:end', translate);
                self.baseTime = null;
                self.distance = null;
                self.base = null;
            },

            scrollTo(destination, duration = 0){
                var self = this;

                if(!duration){ 
                    self.pos = destination;
                    Dom.css(self.$refs.inner, 'transform', 'translate' + this.axi + '(' + destination + 'px)');
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
                        self.scrollTo(start + self.ease((now - startTime) / duration) * range);
                        self.fxer = Util.rfa(step);
                    }
                }

                self.fxer = Util.rfa(step);
            },

            scrollEnd(){
                var self = this;

                if(!self.fxer) return;

                Util.crfa(self.fxer);
                self.fxer = false;

                self.$emit('compare', 'scroll:end', self.pos);

                if(self.pos >= self.max){
                    self.$emit('scroll:limit', self.pos, 1);
                }else if(self.pos <= self.min){
                    self.$emit('scroll:limit', self.pos, -1);
                }
            }
        }
    }
</script>