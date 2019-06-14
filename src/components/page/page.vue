<template>
    <overlay :visible="visibility" :fx="fx" :position="position" ref="overlay" class="vm-page" :style="style">
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

<script>
import Overlay from '../overlay';
import Config from '../../config';

export default {
    name: 'page',

    mixins: [Overlay],

    props: {
        visible: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            style: {
                background: Config('page.background') || Config('theme')
            }
        };
    },

    components: {
        Overlay
    }
};
</script>

<style>
    .vm-page.vm-overlay {
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        font-size: 14px;
        flex-direction: column;
    }

    .vm-page-content {
        overflow: hidden;
        flex: 1;
    }

    .vm-page-footer {
        width: 100%;
        text-align: center;
    }
</style>