<template>
    <a href="javascript:" class="vm-swipeout-action" :style="style" @click="onClick">
        <slot></slot>
    </a>
</template>

<script>
import Config from '../../config';

export default {
    name: 'swipeout-action',

    data () {
        return {
            style: {
                background: Config('swipeout-action.background') || Config('theme'),
                color: Config('swipeout-action.color')
            }
        }
    },

    methods: {
        onClick () {
            this.$emit('click');
        }
    }
};
</script>

<style lang="less">
.vm-swipeout-action {
    min-width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    line-height: 1;
    text-align: center;
    text-decoration: none;
}
</style>