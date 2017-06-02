<template>
    <page>
        <topbar>toast组件</topbar>
        <p style="text-align: center;"><btn :small="true" @click="show()" style="width: 80%; margin-top: 20px;">提示</btn></p>
        <p style="text-align: center;"><btn :small="true" @click="success()" style="width: 80%; margin-top: 20px;">成功</btn></p>
        <p style="text-align: center;"><btn :small="true" @click="loading()" style="width: 80%; margin-top: 20px;">loading</btn></p>
    </page>
</template>

<style scoped>
    a{
        font-size: 0.2rem;
        margin: .2rem;
        display: block;
    }
</style>

<script>
    import {
        Page,
        Topbar,
        Toast,
        Button as Btn
    } from 'vmui';

    export default{
        components: {
            Page, 
            Topbar,
            Btn
        },

        methods: {
            show(){
                Toast('操作成功');
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