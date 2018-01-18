<template>
    <row :class="['vm-form-row', flexLayout ? 'vm-form-flex' : '']" :flex="flexLayout">
        <slot name="label">
            <div class="vm-form-label" v-if="label"> 
                {{label}}
                <span v-if="tips || $slots.tips" class="vm-form-tips">
                    <slot name="tips">{{tips}}</slot>
                </span>
            </div>
        </slot>

        <div class="vm-form-field">
            <slot></slot>
        </div>
    </row>
</template>

<style lang="less">
    .vm-form-row{
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
        justify-content: space-between;
        height: 0.24rem;
        line-height: 0.24rem;
        margin-top: 0.06rem;
        margin-bottom: 0.06rem;
    }

    .vm-form-tips{
        color: #aaa;
        font-size: .12rem;
    }
</style>

<script>
    import Row from '../layout/row';

    export default{
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
