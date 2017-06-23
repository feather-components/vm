<template>
    <form :class="'vmui-searchbar vmui-searchbar-' + theme" @submit.prevent="submit()">
        <div class="vmui-searchbar-inner">
            <i class="vmui-searchbar-icon"></i>
            <input :type="searchButtonEnabled ? 'search': 'text'" :placeholder="placeholder" :maxlength="maxlength" @input.trim="input" :value="val" ref="input" @focus="$emit('focus')"  @click="$emit('click')" :readonly="readonly" />
            <a href="javascript:" class="vmui-searchbar-clear" @click="clear()" v-show="val">&times;</a>
        </div>
    </form>
</template>

<style lang="less">
    .vmui-searchbar{
        height: .32rem;
        padding: .06rem 0px;
        line-height: .32rem;
        margin-bottom: 0px;

        ::-webkit-search-cancel-button{
            -webkit-appearance: none;
        }
    }

    .vmui-searchbar-inner{
        height: .32rem;
        border-radius: 100px;
        margin: 0px 0.16rem;
        background: rgba(204, 204, 204, 0.2);
        overflow: hidden;
        position: relative;

        input{
            font-size: .14rem;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            float: left;
            display: block;
            border: 0px;
            padding: 0px 0.32rem;
            outline: none;
            background: transparent;
            -webkit-transform: translateY(-1px);
            transform: translateY(0px);

            &:focus{
                border: 0px;
            }
        }
    }

    .vmui-searchbar-icon{
        position: absolute;
        background: url(./search_blue@2x.png?__inline) center center no-repeat;
        background-size: 100%;
        left: .07rem;
        width: 0.2rem;
        height: .32rem;
        display: inline-block;
    }

    .vmui-searchbar-clear{
        position: absolute;
        text-decoration: none;
        text-align: center;
        right: .07rem;
        top: .06rem;
        color: #666;
        line-height: 0.16rem;
        width: 0.16rem;
        height: 0.16rem;
        display: inline-block;
        border: 1px solid #666;
        border-radius: 100px;
        font-size: 0.12rem;
        font-family: arial;
    }

    .vmui-searchbar-blue{
        background: #28304E;

        input{
            color: #fff;
        }

        .vmui-searchbar-clear{
            color: #fff;
            border: 1px solid #fff;
        }

        ::-webkit-input-placeholder{
            color: #ccc;
        }

        .vmui-searchbar-icon{
            background: url(./search_white@2x.png?__inline) center center no-repeat;
        }
    }
</style>

<script>
    export default{
        name: 'searchbar',

        props: {
            theme: {
                type: String,
                default: 'white'
            },

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
            },

            searchButtonEnabled: {
                type: Boolean,
                default: false
            },

            value: {
                type: String,
                default: ''
            }
        },

        data(){
            return {
                val: this.value
            };
        },

        watch: {
            val(v){
                this.$emit('input', v);
            },

            value(v){
                this.val = v.trim();
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
                this.val = this.$refs.input.value;
            },

            clear(){
                this.val = '';
                this.$emit('clear');
            },

            submit(){
                this.$emit('submit');
                this.$refs.input.blur();
            }
        }
    }
</script>