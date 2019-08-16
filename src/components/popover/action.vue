<template>
    <a href="javascript:" class="vm-popover-action" :style="{color: color}">
        <span class="vm-popover-action-icon"><slot name="icon"></slot></span>
        <slot></slot>
    </a>
</template>

<script>
import Config from '../../config';

export default {
    name: 'popover-action',

    data () {
        return {
            color: Config('popover.actions-color')
        };
    },
};
</script>

<style>
.vm-popover-action-icon {
    margin-right: 5px;
}

.vm-popover-action {
    padding: 0px 10px;
    height: 35px;
    line-height: initial;
    display: flex;
    align-items: center;
    font-size: 14px;
    text-decoration: none;
}
</style>