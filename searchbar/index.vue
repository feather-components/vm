<template>
<form class="vmui-searchbar" @submit.prevent="submit()">
    <div class="vmui-searchbar-input">
        <i class="vmui-searchbar-icon"></i>
        <input type="text" :placeholder="placeholder" :maxlength="maxlength" @input.trim="input()" v-model="value" ref="input" @focus="$emit('focus')"  @click="$emit('click')" :readonly="readonly" />
        <a href="javascript:" class="vmui-searchbar-clear" @click="clear()" v-show="clearVisible">&times;</a>
    </div>
</form>
</template>

<style>
.vmui-searchbar{
    height: .32rem;
    padding: .06rem 0px;
    line-height: .32rem;
    background: #28304E;
}

.vmui-searchbar-input{
    height: .32rem;
    border-radius: 100px;
    margin: 0px 0.16rem;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    position: relative;

    .vmui-searchbar-icon{
        position: absolute;
        background: url(./search_white@2x.png?__inline) center center no-repeat;
        background-size: 100%;
        left: .07rem;
        width: 0.2rem;
        height: .32rem;
        display: inline-block;
    }

    input{
        font-size: .12rem;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        color: #fff;
        float: left;
        display: block;
        border: 0px;
        padding: 0px 0.32rem;
        outline: none;
        background: transparent;
        -webkit-transform: translateY(-1px);
        transform: translateY(0px);
    }

    .vmui-searchbar-clear{
        position: absolute;
        font-family: consolas;
        text-decoration: none;
        text-align: center;
        right: .07rem;
        top: .072rem;
        color: #fff;
        line-height: 0.16rem;
        width: 0.16rem;
        height: 0.16rem;
        display: inline-block;
        border: 1px solid #fff;
        border-radius: 100px;
    }
}
</style>

<script>
export default{
    props: {
        maxlength: {
            type: Number,
            default: 50
        },

        placeholder: {
            type: String,
            default: "请输入关键字进行搜索"
        },

        readonly: {
            type: Boolean,
            default: false
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
        focus(){
            this.$refs.input.focus();
        },

        blur(){
            this.$refs.input.blur();
        },

        input(){
            this.$emit('input', this.value.trim());
        },

        clear(){
            this.value = '';
            this.$emit('input', this.value.trim());
            this.$emit('clear');
        },

        submit(){
            this.$emit('submit');
            this.$refs.input.blur();
        }
    }
}
</script>