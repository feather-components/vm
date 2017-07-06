<template>
    <page>
        <topbar slot="header">grid组件</topbar>
        <grid>
            <grid-item v-for="(index, item) of 10" style="width: 33.33%;">{{index}}</grid-item>
            <grid-item style="width: 66.66%">上传</grid-item>
        </grid> 
    </page>
</template>

<style scoped>

</style>

<script>
    import {
        Page,
        Topbar,
        Grid,
        GridItem
    } from 'vm';

    export default{
        components: {
            Page, 
            Topbar,
            Grid,
            GridItem
        }
    }
</script>