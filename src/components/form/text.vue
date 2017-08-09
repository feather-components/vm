<template>
    <v-box :label="label" :class="{
        'vm-form-text-box': true,
        'vm-form-text-multiline': multiline
    }" :vertical-layout="multiline"> 
        <template slot="desc">
            <slot name="desc"></slot>
        </template>    

        <input v-if="!multiline" 
            ref="input" 
            :type="type" 
            class="vm-form-text" 
            :name="name" 
            v-model="val" 
            @focus="$emit('focus')" 
            @blur="$emit('blur')" 
            @click="$emit('click')" 
            :placeholder="placeholder"
            :readonly="readonly"
            :style="{
                width: width
            }"
        /> 

        <template v-else>
            <div 
                ref="input" 
                class="vm-form-text" 
                :contenteditable="!readonly" 
                @input="input"
                @focus="$emit('focus')"
                @blur="$emit('blur')"
                @click="$emit('click')"
            ></div>

            <span v-if="!val" class="vm-form-text-placeholder">{{placeholder}}</span>
        </template>

        <a href="javascript:" class="vm-form-text-ci" @click="clear" v-if="clearable && val">&times;</a>

        <span class="vm-form-text-unit" v-if="unit">{{unit}}</span>

        <template slot="msg">
            <slot name="msg"></slot>
        </template> 
    </v-box>
</template>

<style lang="less">
    .vm-form-text-box .vm-form-box-inner{
        position: relative;
    }

    .vm-form-text{
        color: #222;
        line-height: .24rem;
        border: 0px;
        outline: none;
        padding: 0px;

        &::-webkit-input-placeholder{
            color: #e1e1e1;
        }
    }

    input.vm-form-text{
        text-align: right;
    }

    div.vm-form-text{
        min-height: .24rem;
        max-height: 1rem;
        height: auto;
        resize: none;
        overflow: auto;
        &:focus {
            border: 0;
            outline: 0;
        }
    }

    .vm-form-text-placeholder{
        position: absolute;
        left: 0rem;
        top: 0rem;
        height: 0.24rem;
        color: #E1E1E1;
        line-height: .24rem;
    }

    .vm-form-text-unit{
        height: 0.24rem;
        display: inline-block;
        margin-left: 5px;
    }

    .vm-form-text-ci{
        display: inline-block;
        text-decoration: none;
        color: #333;
        margin-left: 5px;
    }

    .vm-form-text-multiline .vm-form-text-ci{
        position: absolute;
        bottom: 0px;
        right: 0px;
    }
</style>

<script>
    import vBox from './box';
    import {Single} from './abstract';

    export default{
        name: 'textinput',

        mixins: [vBox, Single],

        props: {
            multiline: {
                type: Boolean,
                default: false
            },

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
                default: true
            },

            unit: {
                type: String,
                default: null
            },

            width: {
                type: [Number, String],
                default: null
            },

            type: {
                type: String,
                default: 'text'
            }
        },

        components: {
            vBox
        },

        methods:{
            focus(){
                this.$refs.input.focus();
            },

            blur(){
                this.$refs.input.blur();
            },

            clear(){
                this.val = '';
                this.$refs.input.textContent = '';
                this.$emit('clear');
            },

            input(){
                this.val = this.$refs.input.textContent;
            }
        }
    }
</script>
