<template>
    <ul class="vm-grid">
        <slot></slot>
    </ul>
</template>

<style>
    .vm-grid{
        padding: 0px;
        margin: 0px;
        display: -webkit-flex;
        display: flex;
        list-style: none;
        flex-wrap: wrap;
        flex-grow: 1;
        align-items: center;
        margin-top: 0.05rem;
    }
</style>

<script>
    export default{
        name: 'grid'
    }
</script>