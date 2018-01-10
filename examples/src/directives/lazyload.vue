<template>
    <vm-page>
        <vm-topbar slot="header">lazyload</vm-topbar>
        <vm-scroll v-lazyload>
            <img v-for="item of 100" data-src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1849159362,540367789&fm=27&gp=0.jpg" />
        </vm-scroll>
    </vm-page>
</template>

<style scoped>
    img{
        display: block;
        width: 100%;
        height: 100px;
    }
</style>

<script>
    export default {
    }
</script>