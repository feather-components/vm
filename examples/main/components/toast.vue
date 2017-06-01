<template>
    <page>
        <topbar>toast组件</topbar>
        <a herf="javascript:" @click="show">无icon</a>
        <a herf="javascript:" @click="success">有icon</a>
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
        Toast
    } from 'vmui';

    export default{
        components: {
            Page, 
            Topbar
        },

        methods: {
            show(){
                Toast('操作成功');
            },

            success(){
                Toast.success('操作成功');
            }
        }
    }
</script>