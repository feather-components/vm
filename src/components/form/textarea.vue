<template>
    <row :label="label" class="vm-form-textarea" :tips="tips"> 
        <div class="vm-form-textarea-inner">
            <div ref="area" 
                class="vm-form-textarea" 
                :contenteditable="!readonly" 
                @input="input"
                @focus="$emit('focus')"
                @blur="$emit('blur')"
                @click="$emit('click')"
            ></div>

            <span v-if="!val" class="vm-form-textarea-ph">{{placeholder}}</span>
        </div>

        <div v-if="$slots.default" class="vm-form-textarea-other"><slot></slot></div>

        <template slot="tips" v-if="$slots.tips">
            <slot name="tips"></slot>
        </template> 
    </row>
</template>

<style lang="less">
    .vm-form-textarea-inner{
        position: relative;
        width: 100%;
    }

    .vm-form-textarea-ph{
        position: absolute;
        top: 0px;
        color: #ccc;
        font-weight: 300;
    }

    .vm-form-textarea{
        outline: none;
        word-break: break-all;
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
    import Row from './box';
    import Text from './text';
    import {Single} from './abstract';

    export default{
        name: 'textarea',

        mixins: [Row, Text, Single],

        components: {
            Row
        },

        methods:{
            focus(){
                this.$refs.area.focus();
            },

            blur(){
                this.$refs.area.blur();
            },

            input(){
                this.val = this.$refs.area.textContent;
            }
        }
    }
</script>
