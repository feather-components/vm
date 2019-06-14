<template>
    <div class="vm-tabs-pane">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'tabs-pane'
};
</script>

<style lang="less">
.vm-tabs-pane {
    width: 100%;
    height: 1px;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
}
</style>