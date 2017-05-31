<template>
    <page>
        <topbar>alert组件</topbar>
        <a herf="javascript:" @click="alert">alert</a>
        <a herf="javascript:" @click="confirm">confirm</a>
    </page>
</template>

<style scoped lang="less">
    
</style>

<script>
    import {
        Page,
        Topbar,
        Alert,
        Confirm
    } from 'vmui';

    export default{
        components: {
            Page, 
            Topbar
        },

        methods: {
            alert(){
                Alert('我是alert');
            },

            confirm(){
                Confirm('我是confirm，请点击确定');
            }
        }
    }
</script>