<template>
<div class="vmui-scroll" :id="oid" :style="style" >
    <div class="vmui-scroll-inner">
        <slot></slot>
    </div>
</div>
</template>

<script>
import Scroll from 'iscroll';
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
        }
    },

    data(){
        return {
            opts: {
                scrollbars: true,
                fadeScrollbars: true,
                fixedScrollbar: true
            },
            oid: this.id || ('s' + Date.now()),
            instance: null
        }
    },

    mounted: function(){   
        this.instance = new Scroll('#' + this.oid, Object.assign(this.opts, this.options));
    },

    beforeDestroy: function(){
        this.instance.destroy();
    },

    methods: Object.assign(methods, {
        refresh(){
            this._resize_();
            this.instance.refresh();
            this.instance.hasVerticalScroll = true;
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