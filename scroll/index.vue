<template>
<div class="vmui-scroll" :id="oid" :style="style" @touchend="leave()">
    <div class="vmui-scroll-inner">
        <slot></slot>
    </div>
</div>
</template>

<script>
import Scroll from 'iscroll/build/iscroll-probe';
import Resize from '../resize';
import _ from '../helper';

var methods = {};

for(var property in Scroll.prototype){
    (function(property){
       methods[property] = function(...args){
            return this.instance[property](...args);
        }; 
    })(property);
}

export default{
    mixins: [Resize],

    props: {
        style: {
            type: Object,
            default: function(){
                return {};
            }
        },

        options: {
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
                probeType: 1
            },
            oid: this.id || ('s' + Date.now()),
            instance: null
        }
    },

    mounted: function(){   
        this.$nextTick(() => {
            this.instance = new Scroll('#' + this.oid, Object.assign({
                freeScroll: false
            }, this.opts, this.options));

            this.initEvents();
        })
    },

    beforeDestroy: function(){
        this.instance.destroy();
    },

    methods: Object.assign(methods, {
        initEvents(){
            this.instance.on('scrollStart', () => {
                this.scrolling = true;
            });

            this.instance.on('scroll', () => {
                this.tryTrigger('scroll');
            });

            this.instance.on('scrollEnd', () => {
                this.scrolling = false;
                this.tryTrigger('scrollEnd');
            });
        },

        leave(){
            this.scrolling && this.tryTrigger('leave');
        },

        refresh(){
            setTimeout(() => {
                this._resize_();
                this.instance.refresh();
                this.opts.scrollbars && (this.instance.hasVerticalScroll = true);
            }, 0);
        },

        tryTrigger(event){
            var instance = this.instance, isVertical = instance.options.eventPassthrough != 'horizontal';
            var total, value, b;

            if(isVertical){
                total = _.height(instance.scroller);
                value = instance.y;
                b = _.height(this.$el);
            }else{
                total = _.width(instance.scroller);
                value = instance.x;
                b = _.width(document);
            }

            if(this.is2top(value)){
                this._execEvent(event + '2top');
                this.$emit(event + '2top');
                this.$emit('2top');
            }

            if(this.is2bottom(total + value - b)){
                this._execEvent(event + '2bottom');
                this.$emit(event + '2bottom');
                this.$emit('2bottom');
            }
        }
    })
}
</script>

<style>
.vmui-scroll{
    position: relative;
    background: #fff;
    width: 100%;
    overflow: hidden;

    .iScrollVerticalScrollbar{
        width: 3px !important;
    }
}
</style>