<template>
    <vm-page>
        <vm-topbar slot="header">toast组件</vm-topbar>

        <div style="margin: 40px; display: flex;">
            <vm-button radius="0" size="large" @click="show()">提示</vm-button>
            <vm-button radius="0" size="large" @click="success()">成功</vm-button>
            <vm-button radius="0" size="large" @click="loading()">loading</vm-button>
        </div>
    </vm-page>
</template>

<script>
import {Toast} from 'vm';
export default {
    mounted () {
        Toast({
            message: 'hello',
            type: 'loading'
        });
    },
    methods: {
        show () {
            this.$toast({
                message: '操作成功操作成功操作成功<br>换行'
            });
        },

        success () {
            this.$toast.success('操作成功');
        },

        loading () {
            this.$toast.loading('加载中');
        }
    }
};
</script>