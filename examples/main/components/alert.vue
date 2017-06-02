<template>
    <page>
        <topbar>alert组件</topbar>
        <p style="text-align: center;"><btn :small="true" @click="alert()" style="width: 80%; margin-top: 20px;">alert</btn></p>
        <p style="text-align: center;"><btn :small="true" @click="confirm()" style="width: 80%; margin-top: 20px;">confirm</btn></p>
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
        Confirm,
        Button as Btn
    } from 'vmui';

    export default{
        components: {
            Page, 
            Topbar,
            Btn
        },

        methods: {
            alert(){
                Alert('我是alert');
            },

            confirm(){
                Confirm('我是confirm，请点击确定', function(){
                    Alert('刚刚点击了确定');
                });
            }
        }
    }
</script>