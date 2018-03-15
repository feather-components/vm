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
                class="vm-form-textarea-edit" 
                :contenteditable="!readonly" 
                @input="input"
                @focus="$emit('focus')"
                @blur="$emit('blur')"
                @click="$emit('click')"
                :value="val"
            ></div>

            <span v-if="!val" class="vm-form-textarea-ph" @click="clickPh">{{placeholder}}</span>
            <span class="vm-form-textarea-icon" v-if="$slots.icon"><slot name="icon"></slot></span>
        </div>

        <div v-if="$slots.default" class="vm-form-textarea-other"><slot></slot></div>
    </cell>
</template>

<style lang="less">
    .vm-form-textarea-inner{
        position: relative;
        width: 100%;
        display: flex;
    }

    .vm-form-textarea-ph{
        position: absolute;
        left: 0px;
        top: 0px;
        color: #ccc;
        font-weight: 300;
    }

    .vm-form-textarea-edit{
        outline: none;
        flex: 1;
        color: #222;
        word-break: break-all;
    }

    .vm-form-textarea-other{
        margin-top: 0.06rem;
    }

    .vm-form-textarea-icon{
        margin-left: 0.1rem;
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

        mounted(){
            this.$nextTick(() => {
                this.setValue(this.val);
            });
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
            },

            clickPh(){
                this.$refs.area.focus();
            },

            setValue(v){
                this.$refs.area.textContent != v && (this.$refs.area.textContent = v);
            }
        }
    }
</script>
