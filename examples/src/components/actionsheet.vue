<template>
    <page>
        <topbar slot="header">actionsheet组件</topbar>
        <p style="text-align: center;"><btn @click="action()" style="width: 80%; margin-top: 20px;">点击我</btn></p>
        <p style="text-align: center;"><btn @click="$refs.def.open()" style="width: 80%; margin-top: 20px;">自定义样式</btn></p>
        <actionsheet :actions="actions" :visible="false" ref="def">
            <template slot="item" scope="props">
                <div style="background: #fff; height: 0.4rem; line-height: 0.4rem; border-bottom: 1px solid #eee;">
                    {{props.text}}
                </div>
            </template>
            
            <div style="background: #fff; height: 0.4rem; line-height: 0.4rem;" slot="cancel">
                取消
            </div>
        </actionsheet>
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
            Btn,
            Actionsheet: ActionSheet.Component
        },

        data(){
            return {
                actions: {
                    '新增'(){
                        Toast('点击了新增')
                    },

                    '删除'(){
                        Toast('点击了删除')
                    }
                }
            }
        },

        methods: {
            action(){
                ActionSheet(this.actions);
            }
        }
    }
</script>