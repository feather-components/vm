<template>
    <row :label="label" class="vm-form-textinput" :tips="tips" :vertical-layout="false"> 
        <input ref="input" :type="type" :name="name" :value="val"
            @input="onInput"
            @focus="$emit('focus')" 
            @blur="$emit('blur')" 
            @click="$emit('click')" 
            :placeholder="placeholder"
            :readonly="readonly"
            :style="{textAlign: align}"
        /> 

        <icon name="close" v-if="clearable && val" @click.native="clear" class="vm-form-clear" :size=".14"/>

        <span v-if="$slots.default" class="vm-form-textinput-other"><slot></slot></span>

        <template slot="tips" v-if="$slots.tips">
            <slot name="tips"></slot>
        </template> 
    </row>
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
    import Row from './box';
    import Icon from '../icon';
    import {Single} from './abstract';

    export default{
        name: 'textinput',

        mixins: [Row, Single],

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
            Row,
            Icon
        },

        methods:{
            clear(){
                this.val = '';
                this.$emit('clear');
            },

            onInput(){
                this.val = this.$refs.input.value;
            }
        }
    }
</script>