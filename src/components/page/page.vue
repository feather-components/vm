<template>
    <overlay :visible="visibility" :fx="fx" :position="position" ref="overlay" class="vmui-page">
        <div class="vmui-page-header" ref="header">
            <slot name="header"></slot>
        </div>
        
        <slot></slot>

        <div class="vmui-page-footer" ref="footer">
            <slot name="footer"></slot>
        </div>
    </overlay>
</template>

<style>
    .vmui-page{
        width: 100%;
        height: 100%;
        background: #fff;
    }

    .vmui-page-footer{
        width: 100%;
        position: fixed;
        left: 0px;
        bottom: 0px;
    }
</style>

<script>
    import Overlay from '../overlay';
    
    export default{
        name: 'page',

        mixins: [Overlay],

        props: {
            visible: {
                type: Boolean,
                default: true
            }
        },

        components: {
            Overlay
        }
    }
</script>