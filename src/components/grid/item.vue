<template>
    <li class="vm-grid-item">
        <slot></slot>
    </li>
</template>

<style>
    .vm-grid-item{
        word-break: break-all;
        box-sizing: border-box;
    }
</style>

<script>
    export default{
        name: 'grid-item'
    }
</script>