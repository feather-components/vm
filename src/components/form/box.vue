<template>
    <div :class="{
        'vm-form-box': true,
        'vm-form-box-vertical': verticalLayout,
        'vm-form-box-horizontal': !verticalLayout
    }">
        <label class="vm-form-box-label" v-if="label">
            {{label}}
            <span class="vm-form-box-msg" v-if="verticalLayout">
                <slot name="msg"></slot>
            </span>
        </label>

        <div class="vm-form-box-inner">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="less">
    .vm-form-box{
        background: #fff;
        margin: 0px 0.16rem;
        padding: 0.12rem 0px;
        border-top: 0px;
        line-height: 0.24rem;

        > *{
            font-size: 0.14rem;
        }
    }

    .vm-form-box-vertical{
        padding-bottom: 0.09rem;

        .vm-form-box-label{
            width: 100%;
        }
    }

    .vm-form-box-horizontal{
        display: flex;

        .vm-form-box-inner{
            min-height: 0.24rem;
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }

    .vm-form-box ~ .vm-form-box{
        border-top: 1px solid #eee;
    }

    .vm-form-box-label{
        display: block;
        height: 0.24rem;
        color: #555;
        width: 30%;
    }

    .vm-form-box-msg{
        display: inline-block;
        font-size: .12rem;
        color: #878787;
        margin-left: .025rem;
    }
</style>

<script>
    export default{
        name: 'box',

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
            }
        }
    }
</script>
