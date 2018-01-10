<template>
    <form :class="['vm-searchbar', 'vm-searchbar-' + theme]" @submit.prevent="submit()">
        <div class="vm-searchbar-inner" :style="{background: inputBgColor}">
            <icon name="search" class="vm-searchbar-icon" />
            <input :type="searchButtonEnabled ? 'search': 'text'" :placeholder="placeholder" :maxlength="maxlength" @input.trim="input" :value="val" ref="input" @focus="$emit('focus')"  @click="$emit('click')" :readonly="readonly" />
            <a href="javascript:" class="vm-searchbar-clear" @click="clear()" v-show="val">
                <icon name="close" />
            </a>
        </div>
    </form>
</template>

<style lang="less">
    .vm-searchbar{
        height: .32rem;
        padding: .06rem 0px;
        line-height: .32rem;
        margin-bottom: 0px;

        ::-webkit-search-cancel-button{
            -webkit-appearance: none;
        }

        .vm-iconfont{
            opacity: 0.8;
        }
    }

    .vm-searchbar-blue{
        background: #28304E;
        color: #fff;

        input{
            color: #fff;
        }
    }

    .vm-searchbar-inner{
        height: .32rem;
        border-radius: 100px;
        margin: 0px 0.16rem;
        overflow: hidden;
        position: relative;

        input{
            color: inherit;
            font-size: .14rem;
            box-sizing: border-box;
            width: 100%;
            height: 0.32rem;
            line-height: 0.32rem;
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

        ::-webkit-input-placeholder{
            color: inherit;
            opacity: 0.5;
        }
    }

    .vm-searchbar-icon{
        position: absolute;
        left: .1rem;
        width: 0.2rem;
        height: .32rem;
        font-weight: bold;
        display: inline-block;
    }

    .vm-searchbar-clear{
        position: absolute;
        text-align: center;
        right: .07rem;
        top: 0rem;
        line-height: 0.32rem;
        width: 0.16rem;
        height: 0.32rem;
        color: inherit;
        display: inline-block;
        font-weight: bold;
    }
</style>

<script>
    import Icon from '../icon';
    import {Util} from '../../helper';

    var Searchbar = {
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
            },

            inputBgColor: {
                type: String,
                default(){
                    return Searchbar.config('inputBgColor');
                }
            }
        },

        components: {
            Icon
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
    };

    Util.defineConfig(Searchbar, {
        inputBgColor: 'rgba(204, 204, 204, 0.2)'
    });

    export default Searchbar;
</script>