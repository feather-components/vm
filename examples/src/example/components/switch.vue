<template>
    <vm-page>
        <vm-topbar>Switch组件</vm-topbar>

        <br />
        <vm-switch v-model="t" /> {{t}}
        <hr />
        <vm-switch v-model="s" /> {{s}}
        <hr />
        <vm-form-row label="选项" style="background: #ddd">
            <div slot="tips">
                <vm-switch v-model="ts"/>
            </div>
        </vm-form-row>
    </vm-page>
</template>

<script>
export default {
    data () {
        return {
            t: false,
            s: true,
            ts: true
        };
    },
    methods: {
        onForWard () {
            alert('点击了forward');
        }
    }
};
</script>