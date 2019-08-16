<template>
    <page>
        <vm-topbar slot="header">actionsheet组件</vm-topbar>
        <p style="text-align: center;"><btn @click="visible = true" style="width: 80%; margin-top: 20px;">点击</btn></p>
        <vm-actionsheet v-model="visible">
            <vm-actionsheet-item @click="hehe" extras="啦啦啦">
                呵呵
            </vm-actionsheet-item>
            <vm-actionsheet-item disabled>不能用</vm-actionsheet-item>
            <vm-actionsheet-item @click="add">新增</vm-actionsheet-item>
            <vm-actionsheet-item @click="del">删除</vm-actionsheet-item>
        </vm-actionsheet>
    </page>
</template>

<script>
import {
    Page,
    Topbar,
    Toast,
    Button as Btn
} from 'vm';

export default {
    components: {
        Page,
        Topbar,
        Btn
    },

    data () {
        return {
            visible: false
        };
    },

    watch: {
        visible (v) {
            console.log(v);
        }
    },

    methods: {
        add () {
            Toast('点击新增');
        },

        del () {
            Toast('点击删除');
        },

        hehe () {
            window.alert('呵呵呵呵');
        }
    }
};
</script>