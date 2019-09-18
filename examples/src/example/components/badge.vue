<template>
    <vm-page>
        <vm-topbar slot="header">Badge组件</vm-topbar>
        <vm-badge>10</vm-badge>
    </vm-page>
</template>

<script>
import {Badge} from 'vm';
export default {
    components: {VmBadge: Badge}
};
</script>