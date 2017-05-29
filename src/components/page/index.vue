<template>
<Overlay :visible="visibility" :fx="fx" :position="position" ref="overlay" class="vmui-page">
    <div class="vmui-page-header" ref="header">
        <slot name="header"></slot>
    </div>
    
    <slot></slot>

    <div class="vmui-page-footer" ref="footer">
        <slot name="footer"></slot>
    </div>
</Overlay>
</template>

<style>
.vmui-page{
    width: 100%;
    height: 100%;
    background: #fff;
}

.vmui-page-header{
    position: relative;
    top: 0px;
    left: 0px;
}

.vmui-page-footer{
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
}
</style>

<script>
import Overlay from '../overlay';
import Factory from '../factory';
import Resize from '../resize';

export default{
    mixins: [Overlay],

    props: {
        visible: {
            type: Boolean,
            default: true
        }
    },

    components: {
        Overlay
    },

    mounted(){
        this.resize();
    },

    methods: {
        open(){
            Overlay.methods.open.call(this);
            this.resize();
        },

        resize(){
            setTimeout(() => {Resize.resize(this.$el);}, 10);
        }
    }
}
</script>