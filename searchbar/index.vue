<template>
<div>
    <input type="text" :placeholder="placeholder" @input="input()" ref="kw" />
</div>
</template>

<style>

</style>

<script>
export default{
    props: {
        placeholder: {
            type: String,
            default: "请输入关键字进行搜索"
        }
    },

    data(){
        return {
            value: ''
        };
    },

    methods: {
        input(){
            this.value = this.$refs.kw.value;
            this.$emit('input', this.value);
        }
    }
}
</script>