<template>
    <cell :label="label" class="vm-form-textarea" :tips="tips">
        <div class="vm-form-textarea-inner">
            <span v-show="!val" class="vm-form-textarea-ph" @click="clickPh">
                <slot name="placeholder">{{placeholder}}</slot>
            </span>

            <div ref="area"
                class="vm-form-textarea-edit needsclick"
                :style="{
                    'max-height': maxHeight
                }"
                :contenteditable="!readonly"
                @input="input"
                @focus="$emit('focus')"
                @blur="$emit('blur')"
                @click="click"
            ></div>

            <div class="vm-form-textarea-icon" v-if="$slots.icon"><slot name="icon"></slot></div>
        </div>

        <template slot="label" v-if="$slots.label">
            <slot name="label"></slot>
        </template>

        <template slot="tips" v-if="$slots.tips">
            <slot name="tips"></slot>
        </template>

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
        z-index: 1;
    }

    .vm-form-textarea-edit{
        position: relative;
        z-index: 2;
        overflow: scroll;
        outline: none;
        flex: 1;
        color: #222;
        word-break: break-all;
        -webkit-user-select: text;
        -webkit-user-modify: read-write-plaintext-only;
        -moz-user-modify: read-write-plaintext-only;
        user-modify: read-write-plaintext-only;
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

export default {
    name: 'textarea',

    mixins: [Cell, Text, Single],

    components: {
        Cell
    },

    props: {
        maxHeight: {
            type: String,
            default: 'auto'
        }
    },

    mounted () {
        this.$nextTick(() => {
            this.setValue(this.val);
        });
    },

    methods: {
        input () {
            this.val = this.$refs.area.textContent;
        },

        clickPh () {
            this.$refs.area.focus();
        },

        click () {
            this.focus();
            this.$emit('click');
        },

        focus () {
            this.$refs.area.focus();
        },

        blur () {
            this.$refs.area.blur();
        },

        setValue (v) {
            this.$refs.area.textContent != v && (this.$refs.area.textContent = v);
        }
    }
};
</script>