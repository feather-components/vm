<template>
    <div class="vm-page">
        <div class="vm-page-header" ref="header">
            <slot name="header"></slot>
        </div>

        <div class="vm-page-content">
            <slot></slot>
        </div>

        <div class="vm-page-footer" ref="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
import Config from '../../config';

export default {
    name: 'page',

    data () {
        return {
            style: {
                background: Config('page.background') || Config('theme')
            }
        };
    }
};
</script>

<style>
    .vm-page {
        position: fixed;
        z-index: 10000;
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
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