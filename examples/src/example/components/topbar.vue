<template>
    <vm-page>
        <vm-topbar style="background:#ff0">页面标题</vm-topbar>
        <br />
        <br />
        <vm-topbar>
            <span>自定义右边按钮</span>
            <div slot="right">添加</div>
        </vm-topbar>
    </vm-page>
</template>

<script>
export default {
    methods: {

    }
};
</script>