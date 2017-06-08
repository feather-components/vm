<template>
    <page>
        <topbar>
            popover组件
            <a href="javascript:" slot="right">
                点我
                <popover :actions="{
                    '扫一扫': {
                        icon: 'ion-ios-person-add',
                        callback: showMsg
                    },
                    '添加朋友': showMsg,
                    '收付款': showMsg,
                    '返回上个页面': back
                }" />
            </a>
        </topbar>
    </page>
</template>

<script>
    import {
        Page,
        Topbar,
        Popover,
        Toast
    } from 'vmui';
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