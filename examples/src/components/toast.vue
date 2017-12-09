<template>
    <page>
        <topbar slot="header">toast组件</topbar>
        <p style="text-align: center;"><btn @click="show()" style="width: 80%; margin-top: 20px;">提示</btn></p>
        <p style="text-align: center;"><btn @click="success()" style="width: 80%; margin-top: 20px;">成功</btn></p>
        <p style="text-align: center;"><btn  @click="loading()" style="width: 80%; margin-top: 20px;">loading</btn></p>
    </page>
</template>

<script>
    import Vue from 'vue';
    import {
        Page,
        Topbar,
        Toast,
        Button as Btn
    } from 'vm';

    export default{
        components: {
            Page, 
            Topbar,
            Btn
        },

        methods: {
            show(){
                Toast('操作成功', false);
            },

            success(){
                Toast.success('操作成功');
            },

            loading(){
                Toast.loading('加载中');
            }
        }
    }
</script>