<template>
    <li class="vmui-grid-item">
        <slot></slot>
    </li>
</template>

<style>
    .vmui-grid-item{
        word-break: break-all;
        box-sizing: border-box;
    }
</style>

<script>
    export default{
        name: 'grid-item'
    }
</script>