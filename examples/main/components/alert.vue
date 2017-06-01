<template>
    <page>
        <topbar>alert组件</topbar>
        <a herf="javascript:" @click="alert" class="alert">我是alert</a>
        <a herf="javascript:" @click="confirm" class="confirm">我是confirm</a>
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
        Alert,
        Confirm
    } from 'vmui';

    console.log(Alert)

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