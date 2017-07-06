<template>
    <page>
        <topbar slot="header">uploader组件</topbar>
        <div class="uploader">
            <uploader @select="select" @upload:progress="progress" url="/index.html"  style="height: 50%;"></uploader>
        </div>

        <div v-if="src" style="height: 50%;" class="box">
            <div class="progress"></div>
            <img :src="src" height="100%" />
        </div>
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
                src: false,
                progress: '0%'
            }
        },

        methods: {
            select(files){
                this.src = files[0].url;
            }
        }
    }
</script>