<template>
    <vm-page>
        <vm-topbar slot="header">Badge组件</vm-topbar>
        <vm-badge>10</vm-badge>
        <br />
        <vm-badge>未读消息</vm-badge>
        <br />
        <vm-badge style="width: 100px; height: 60px;line-height: 60px;" color="blue">10</vm-badge>
        <br />
        <vm-form-row label="徽章" style="background:#e1e1e1">
            <template slot="tips">
                未读消息
                <vm-badge style="line-height:1.2">10</vm-badge>
            </template>
        </vm-form-row>
    </vm-page>
</template>

<script>
import {Page, Topbar, Badge} from 'vm';
export default {
    components: {VmBadge: Badge, Page, Topbar}
};
</script>