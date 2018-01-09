<template>
    <overlay :visible="visibility" :fx="fx" :position="position" ref="overlay" class="vm-page" :style="{paddingTop: top}">
        <div class="vm-page-header" ref="header">
            <slot name="header"></slot>
        </div>

        <div class="vm-page-content">
            <slot></slot>
        </div>

        <div class="vm-page-footer" ref="footer">
            <slot name="footer"></slot>
        </div>
    </overlay>
</template>

<style>
    .vm-page.vm-overlay{
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        font-size: .14rem;
        flex-direction: column;
    }

    .vm-page-content{
        overflow: hidden;
        flex: 1;
    }

    .vm-page-footer{
        width: 100%;
        text-align: center;
    }
</style>

<script>
    import Overlay from '../overlay';
    import {Util} from '../../helper';
    
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
                top: Page.topFixed || Page.config('topFixed')
            };
        },

        components: {
            Overlay
        }
    }

    Page.topFixed = '';
    Util.defineConfig(Page, {
        topFixed: '0px'
    });

    export default Page;
</script>