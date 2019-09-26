<template>
    <vm-page>
        <vm-topbar>Textarea组件</vm-topbar>

        <vm-form-row label="textarea">
            <vm-textarea placeholder="多行文本" style="background:#f1f1f1" />
        </vm-form-row>
    </vm-page>
</template>

<script>
export default {
    data () {
        return {
            t: ''
        };
    },
    methods: {
        onForWard () {
            alert('点击了forward');
        }
    }
};
</script>