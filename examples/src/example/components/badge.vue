<template>
    <vm-page>
        <vm-topbar slot="header">Badge组件</vm-topbar>
        <vm-badge>10</vm-badge>
        <br />
        <vm-badge>未读消息</vm-badge>
        <br />
        <vm-badge style="width: 100px; height: 60px;line-height: 60px;" color="blue">10</vm-badge>
        <br />

    </vm-page>
</template>

<script>
import {Page, Topbar, Badge} from 'vm';
export default {
    components: {VmBadge: Badge, Page, Topbar}
};
</script>