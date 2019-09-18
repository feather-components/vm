<template>
    <page>
        <topbar slot="header">
            popover组件
            <popover slot="right">
                <a href="javascript:">操作</a>

                <template slot="actions">
                    <vm-popover-action><i class="vm-iconfont vm-icon-up" slot="icon"></i> 相机</vm-popover-action>
                    <vm-popover-action><i class="ion-ios-add icon"></i> 扫码</vm-popover-action>
                    <vm-popover-action>连连看</vm-popover-action>
                    <vm-popover-action style="color: #fff; font-weight: bold;">自定义一下</vm-popover-action>
                </template>
            </popover>
        </topbar>

        <popover style="width: 50px; height: 30px; position: absolute; bottom: 40%; left: 45%;" message="hello, world">
            点击我
        </popover>
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

export default {
    components: {
        Page,
        Topbar,
        Popover
    },

    methods: {
        showMsg () {
            Toast('点击了popover');
        },

        back () {
            history.back();
        }
    }
};
</script>