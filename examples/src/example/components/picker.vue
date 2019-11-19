<template>
    <vm-page style="background:#f1f1f1;">
        <vm-topbar>Picker组件</vm-topbar>

        <div align="center">
            <vm-button @click="onShow" style="width:90%; margin: 40px auto;">自定义点击展示</vm-button>
        </div>
        <vm-picker title="title" @select="onSelect" :options="options" v-model="visible"></vm-picker>
    </vm-page>
</template>

<script>
export default {
    data () {
        return {
            options: [
                {label: 'option1', value: 1}, {label: 'option2', value: 2}, {label: 'option3', value: 3}, {label: 'option4', value: 4}
            ],
            visible: false
        };
    },
    methods: {
        onShow () {
            this.visible = true;
        },
        confirm (s, v) {
            this['date' + this.n] = s;
            this.date = s;
        },
        onSelect (s) {
            console.log(s);
        }
    }
};
</script>