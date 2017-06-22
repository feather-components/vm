<template>
    <overlay :visible="visibility" :fx="fx" :position="position" ref="overlay" class="vmui-page" :style="{paddingTop: top}">
        <div class="vmui-page-header" ref="header">
            <slot name="header"></slot>
        </div>

        <div class="vmui-page-content">
            <slot></slot>
        </div>

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
        display: flex;
        flex-direction: column;
    }

    .vmui-page-content{
        flex: 1;
    }

    .vmui-page-footer{
        width: 100%;
        text-align: center;
    }
</style>

<script>
    import Overlay from '../overlay';
    
    var Page = {
        name: 'page',

        mixins: [Overlay],

        props: {
            visible: {
                type: Boolean,
                default: true
            }
        },

        data(){
            return {
                top: Page.topFixed
            };
        },

        components: {
            Overlay
        }
    }

    Page.topFixed = '0px';
    export default Page;
</script>