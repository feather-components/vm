<template>
<div class="vmui-scroll" :id="oid" :style="style">
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

        bottomDistance: {
            type: Number,
            default: 0
        }
    },

    data(){
        return {
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
        this.instance = new Scroll('#' + this.oid, Object.assign({
            freeScroll: false
        }, this.opts, this.options));

        this.initEvents();
    },

    beforeDestroy: function(){
        this.instance.destroy();
    },

    methods: Object.assign(methods, {
        initEvents(){
            this.instance.on('scroll', () => {
                this._check2bottom() && this._execEvent('scroll2bottom');
            });

            this.instance.on('scrollEnd', () => {
                this._check2bottom() && this._execEvent('scrollEnd2bottom');
            });
        },

        refresh(){
            this._resize_();
            this.instance.refresh();
            this.opts.scrollbars && (this.instance.hasVerticalScroll = true);
        },

        _check2bottom(){
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

            return total + value - b <= this.bottomDistance;
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