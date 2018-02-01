<template>
    <row :class="['vm-form-cell', flexLayout ? 'vm-form-flex' : '']" :flex="flexLayout">
        <div class="vm-form-label" v-if="label || $slots.label"> 
            <slot name="label">{{label}}</slot>
            <span v-if="tips || $slots.tips" class="vm-form-tips">
                <slot name="tips">{{tips}}</slot>
            </span>
        </div>

        <div class="vm-form-field">
            <slot></slot>
        </div>
    </row>
</template>

<style lang="less">
    .vm-form-cell{
        color: #555;
    }

    .vm-form-field{
        min-height: .36rem; 
        margin-bottom: 0.06rem;
    }

    .vm-form-flex{
         .vm-form-field{
            display: flex;
            flex: 1;
            align-items: center;
            margin-bottom: 0px;
        }
    }

    .vm-form-label{
        display: flex;
        height: 0.24rem;
        line-height: 0.24rem;
        margin-top: 0.06rem;
        margin-bottom: 0.06rem;
    }

    .vm-form-tips{
        color: #aaa;
        margin-start: auto;
        -webkit-margin-start: auto;
        font-size: .12rem;
    }
</style>

<script>
    import Row from '../layout/row';

    export default{
        name: 'form-cell',

        components: {
            Row
        },

        props: {
            label: {
                type: String,
                default: null
            },

            verticalLayout: {
                type: Boolean,
                default: true
            },

            name: {
                type: String,
                default(){
                    return String(Date.now());
                }
            },

            tips: {
                type: String,
                default: null
            }
        },

        data(){
            return {
                flexLayout: !this.verticalLayout && !this.$slots.tips && !this.tips
            };
        }
    }
</script>
