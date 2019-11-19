<template>
    <vm-page>
        <vm-topbar>Textarea组件</vm-topbar>

        <vm-form-row label="textarea">
            <vm-textarea ref="textarea" v-model="t" theme="default" placeholder="多行文本"/>
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