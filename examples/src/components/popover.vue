<template>
    <page>
        <topbar slot="header">
            popover组件
            <a href="javascript:" slot="right">
                <i class="ion-ios-add icon"></i>
                <popover :actions="{
                    '扫一扫': {
                        icon: 'ion-ios-person-add',
                        callback: showMsg
                    },
                    '添加朋友': showMsg,
                    '收付款': showMsg,
                    '返回上个页面': {
                        icon: 'ion-ios-arrow-back',
                        callback: back
                    }
                }" />
            </a>
        </topbar>

        <a href="javascript:" style="display:inline-block; width: 50px; height: 30px; position: absolute; bottom: 40%; left: 45%;">
            点击我
            <popover :actions="{
                    '扫一扫': {
                        icon: 'ion-ios-person-add',
                        callback: showMsg
                    },
                    '添加朋友': showMsg,
                    '收付款': showMsg,
                    '返回上个页面': {
                        icon: 'ion-ios-arrow-back',
                        callback: back
                    }
                }" />
        </a>
    </page>
</template>

<style scoped>
    .icon{
        font-size: 0.3rem;
        display: inline-block;
        margin-top: 0.07rem;
    }
</style>

<script>
    import {
        Page,
        Topbar,
        Popover,
        Toast
    } from 'vm';
    import 'ionicons/dist/css/ionicons.css';

    export default{
        components: {
            Page, 
            Topbar,
            Popover
        },

        methods: {
            showMsg(){
                Toast('点击了popover');
            },

            back(){
                history.back();
            }
        }
    }
</script>