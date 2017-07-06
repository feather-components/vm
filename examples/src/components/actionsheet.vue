<template>
    <page>
        <topbar slot="header">actionsheet组件</topbar>
        <p style="text-align: center;"><btn @click="action()" style="width: 80%; margin-top: 20px;">点击我</btn></p>
    </page>
</template>


<script>
    import {
        Page,
        Topbar,
        ActionSheet,
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
            action(){
                ActionSheet({
                    '新增'(){
                        Toast('点击了新增')
                    },

                    '删除'(){
                        Toast('点击了删除')
                    }
                });
            }
        }
    }
</script>