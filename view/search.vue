<template>
<form class="vmui-search" @submit.false="submit()">
    <div class="vmui-search-input">
        <i class="vmui-search-icon"></i>
        <input type="text" :placeholder="placeholder" @input="input()" ref="kw" v-model="value" />
        <a href="javascript:" class="vmui-search-clear" @touchstart="clear()" v-show="clearVisible">&times;</a>
    </div>
</form>
</template>

<style>
.vmui-search{
    height: 2em;
    padding: .5em 0px;
    line-height: 2em;
}

.vmui-search-input{
    height: 2em;
    border-radius: 100px;
    margin: 0px 1em;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;

    .vmui-search-icon{
        background: url(./search_white@2x.png?__inline) center center no-repeat;
        background-size: 100%;
        margin: 1px .5em 0px .7em;
        width: 1.25em;
        float: left;
        height: 2em;
        display: inline-block;
    }

    input{
        max-width: 75%;
        height: 2em;
        margin-top: 2px;
        color: #fff;
        float: left;
        display: block;
        border: 0px;
        outline: none;
        background: transparent;
    }

    .vmui-search-clear{
        font-family: consolas;
        text-decoration: none;
        text-align: center;
        color: #fff;
        line-height: 1em;
        width: 1em;
        height: 1em;
        display: inline-block;
        margin: .5em .7em 0px 0px;
        float: right;
        border: 1px solid #fff;
        border-radius: 100px;
        transform: translateY(-1px);
        -webkit-transform: translateY(-1px);
    }
}
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

    computed: {
        clearVisible(){
            return this.value.trim() != '';
        }
    },

    methods: {
        input(){
            this.$emit('input', this.value);
        },

        clear(){
            this.value = '';
            this.$emit('input', this.value);
            this.$emit('clear');
        },

        submit(){
            this.$emit('submit');
        }
    }
}
</script>