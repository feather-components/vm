<template>
    <cell :label="label" class="vm-form-textinput" :vertical-layout="false"> 
        <template slot="label" v-if="$slots.label">
            <slot name="label"></slot>
        </template> 

        <input ref="input" :type="type" :name="name"
            @input="onInput"
            @focus="onFocus" 
            @blur="$emit('blur')" 
            @click="$emit('click')" 
            :placeholder="placeholder"
            :readonly="readonly"
            :style="{textAlign: align}"
        /> 

        <icon name="close" v-if="clearable && val" @click.native="clear" class="vm-form-clear" :size=".14"/>
        <span v-if="$slots.default" class="vm-form-textinput-other"><slot></slot></span>        
    </cell>
</template>

<style lang="less">
    .vm-form-textinput input{
        line-height: .24rem;
        border: 0px;
        outline: none;
        padding: 0px;
        flex: 1;
        color: inherit;
        font-size: .14rem;
        margin-left: 0.1rem;
        color: #222;

        &::-webkit-input-placeholder{
            font-weight: 300;
            color: #ccc;
        }
    }

    .vm-form-clear{
        font-weight: bold;
        margin-left: 0.1rem;
    }

    .vm-form-textinput-other{
        margin-left: 0.1rem;
    }
</style>

<script>
    import Cell from './cell';
    import Icon from '../icon';
    import {Single} from './abstract';

    export default{
        name: 'textinput',

        mixins: [Cell, Single],

        props: {
            placeholder: {
                type: String,
                default: null
            },

            readonly: {
                type: Boolean,
                default: false
            },

            clearable: {
                type: Boolean,
                default: false
            },

            type: {
                type: String,
                default: 'text'
            },

            align: {
                type: String,
                default: 'right'
            }
        },

        components: {
            Cell,
            Icon
        },

        watch: {
            val(v){
                this.setValue(v);
            }
        },

        mounted(){
            this.$nextTick(() => {
                this.setValue(this.val);
            });
        },

        methods:{
            clear(){
                this.val = '';
                this.$emit('clear');
            },

            onInput(){
                this.val = this.$refs.input.value;
            },

            onFocus(){
                if(this.readonly){
                    this.$refs.input.blur();
                }else{
                    this.$emit('focus');
                }
            },

            setValue(v){
                this.$refs.input && this.$refs.input.value != v && (this.$refs.input.value = v);
            }
        }
    }
</script>