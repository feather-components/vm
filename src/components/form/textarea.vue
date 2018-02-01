<template>
    <cell :label="label" class="vm-form-textarea" :tips="tips"> 
        <template slot="label" v-if="$slots.label">
            <slot name="label"></slot>
        </template> 

        <template slot="tips" v-if="$slots.tips">
            <slot name="tips"></slot>
        </template> 

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
    </cell>
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

    .vm-form-textarea-other{
        margin-top: 0.06rem;
    }
</style>

<script>
    import Cell from './cell';
    import Text from './text';
    import {Single} from './abstract';

    export default{
        name: 'textarea',

        mixins: [Cell, Text, Single],

        components: {
            Cell
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
