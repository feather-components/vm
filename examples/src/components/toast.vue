<template>
    <vm-page>
        <vm-topbar slot="header">toast组件</vm-topbar>

        <div style="margin: 20px; display: flex;">
            <vm-button radius="0" size="large" @click="show()">提示</vm-button>
            <vm-button radius="0" size="large" @click="success()">成功</vm-button>
            <vm-button radius="0" size="large" @click="loading()">loading</vm-button>
        </div>
    </vm-page>
</template>

<script>
import {Toast} from 'vm';

export default {
    methods: {
        show () {
            Toast({
                message: '操作成功操作成功操作成功<br>换行'
            });
        },

        success () {
            Toast.success('操作成功');
        },

        loading () {
            Toast.loading('加载中');
        }
    }
};
</script>