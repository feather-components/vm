<template>
    <vm-page>
        <vm-topbar>input组件</vm-topbar>

        <vm-form-row vertical-layout label="输入价格">
            <vm-input style="padding:0 10px"/>
        </vm-form-row>

        <vm-form-row align="right" label="输入价格">
            <vm-input />
            <vm-forward :arrow-size="14" @click="onForWard"/>
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