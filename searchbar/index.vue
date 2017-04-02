<template>
<form class="vmui-searchbar" @submit.prevent="submit()">
    <div class="vmui-searchbar-input">
        <i class="vmui-searchbar-icon"></i>
        <input type="text" :placeholder="placeholder" :maxlength="maxlength" @input.trim="input()" v-model="value" ref="input" @focus="$emit('focus')" />
        <a href="javascript:" class="vmui-searchbar-clear" @touchstart="clear()" v-show="clearVisible">&times;</a>
    </div>
</form>
</template>

<style>
.vmui-searchbar{
    height: 2em;
    padding: 13/16/2em 0px;
    line-height: 2em;
    background: #28304E;
}

.vmui-searchbar-input{
    height: 2em;
    border-radius: 100px;
    margin: 0px 1em;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    position: relative;

    .vmui-searchbar-icon{
        position: absolute;
        background: url(./search_white@2x.png?__inline) center center no-repeat;
        background-size: 100%;
        left: .7em;
        width: 1.25em;
        height: 2em;
        display: inline-block;
    }

    input{
        font-size: 12/16em;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        color: #fff;
        float: left;
        display: block;
        border: 0px;
        padding: 0px 3em;
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
        right: .7em;
        top: .45em;
        color: #fff;
        line-height: 1em;
        width: 1em;
        height: 1em;
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