<template>
<div :class="'vmui-scroll vmui-scroll-' + axis" :style="style">
    <div ref="inner" class="vmui-scroll-inner" @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd" @webkitTransitionEnd="onScrollEnd">
        <div class="vmui-scroll-header" ref="header">
            <slot name="header"></slot>
        </div>
        <slot></slot>
    </div>

    <transition name="vmui-scroll-bar-fade" v-if="scrollbars">
        <div ref="bar" class="vmui-scroll-bar" v-show="barVisible"></div>
    </transition>
</div>
</template>

<script>
import Resize from '../resize';
import _ from '../helper';
import {Draggable} from '../draggable';

export default{
    mixins: [Resize],

    props: {
        scrollbars: {
            type: Boolean,
            default: true
        },

        axis: {
            type: String,
            default: 'y'
        },

        style: {
            type: Object,
            default: function(){
                return {};
            }
        },

        is2bottom: {
            type: Function,
            default: function(distance){
                return distance <= 0;
            }
        },

        is2top: {
            type: Function,
            default: function(distance){
                return distance >= 0;
            }
        }
    },

    data(){
        return {
            scrolling: false,
            opts: {
                scrollbars: true,
                fadeScrollbars: true,
                fixedScrollbar: true,
                probeType: 1,
                click: true,
                tap: true
            },
            oid: this.id || ('s' + Date.now()),
            instance: null,
            barVisible: true
        }
    },

    mounted: function(){   
        this.$drag = new Draggable(this.$refs.inner, {
            axis: this.axis
        });
    },

    methods: {
        refresh(){
            var self = this;
            var method = self.axis == 'x' ? 'width' : 'height';

            self.max = _[method](self.$refs.header);
            self.min = -(_[method](self.$refs.inner) - _[method](self.$el));
            self.baseTime = Date.now();
            self.base = Draggable.getTransform(self.$refs.inner)[self.axis];
        },

        onDragStart(event){
            var self = this;

            self.refresh();
            self.scrollTo(self.base);
            self.barVisible = true;
        },

        onDraging(event){
            var self = this;
            var duration = Date.now() - self.baseTime;
            var translate = event.data[self.axis];

            duration >= 300 && self.refresh();   
            self.$drag.stack(translate > 0 || translate < self.min ? 5 : 1);
        },

        onDragEnd(event){
            var self = this;
            var duration = Date.now() - self.baseTime;
            var translate = event.data[self.axis];

            if(duration < 300){
                var distance = event.data[self.axis] - self.base;
                var speed = Math.abs(distance)/duration, deceleration = 0.0006;
                var destination = translate + Math.pow(speed, 2) / (2 * 0.0006) * (distance < 0 ? -1 : 1);

                if(destination < self.min){
                    destination = self.min;
                }else if(destination > 0){
                    destination = self.max;
                }

                duration = speed / deceleration;
                duration > 300 && self.scrollTo(destination, duration);
            }

            if(self.max && translate > 0){
                if(translate > self.max){
                    self.scrollTo(self.max, (translate - self.max) * 5 + 1);
                }else if(translate < self.max){
                    self.scrollTo(0, translate * 5 + 1);
                }
            }

            if(translate < self.min){
                self.scrollTo(self.min, 300);
            }

            self.barVisible = false;
            self.baseTime = null;
            self.distance = null;
            self.base = null;
        },

        scrollTo(destination, duration = 0){
            var self = this;

            _.css(self.$refs.inner, {
                '-webkit-transition': duration ? `transform ${duration}ms` : 'none',
                '-webkit-transform': 'translate' + self.axis.toUpperCase() + `(${destination}px)`
            });
        },

        onScrollEnd(){
            
        },

        tryTrigger2bottom(){

        }
    }
}
</script>

<style>
.vmui-scroll{
    position: relative;
    width: 100%;
    overflow: hidden;

    .vmui-scroll-bar{
        position: absolute;
        right: 0px;
        width: 10px;
        height: 10px;
        background: black;
        top: 0px;
    }
}

.vmui-scroll-header{
    position: absolute;
    transform: translateY(-100%);
    -webkit-transform: translateY(-100%);
}

.vmui-scroll-bar-fade-enter-active, .vmui-scroll-bar-fade-leave-active
{
    transition: transform 3s ease, opacity 3s ease;
    -webkit-transition: -webkit-transform 3s ease, opacity 3s ease;
}

.vmui-scroll-bar-fade-enter, .vmui-fx-center-leave-active,
{
    opacity: 0;
}
</style>