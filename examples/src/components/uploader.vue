<template>
    <page>
        <topbar slot="header">uploader组件</topbar>
        <div class="uploader">
            <uploader @select="select" url="http://www.uploadify.com/uploadify/uploadify.php" style="height: 50%;"></uploader>
        </div>

        <vm-scroll v-if="src" class="box">
            <img :src="src" width="100%" />
        </vm-scroll>
    </page>
</template>

<style scoped>
    .box{
        position: relative;
    }

    .progress{
        position: absolute;
        height: 100%;
        width: 100%;
        text-align: center;
        font-size: 30px;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
    }
</style>

<script>
    import Vue from 'vue';
    import {
        Page,
        Topbar,
        Toast,
        Uploader
    } from 'vm';

    export default{
        components: {
            Page, 
            Topbar,
            Uploader,
            Toast
        },

        data(){
            return {
                src: false
            }
        },

        methods: {
            select(files){
                this.src = files[0].url;
            }
        }
    }
</script>