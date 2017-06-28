<template>
    <div :class="{
        'vmui-form-box': true,
        'vmui-form-box-vertical': verticalLayout,
        'vmui-form-box-horizontal': !verticalLayout
    }">
        <label class="vmui-form-box-label" v-if="label">
            {{label}}
            <span class="vmui-form-box-msg" v-if="verticalLayout">
                <slot name="msg"></slot>
            </span>
        </label>

        <div class="vmui-form-box-inner">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="less">
    .vmui-form-box{
        background: #fff;
        margin: 0px 0.16rem;
        padding: 0.12rem 0px;
        border-top: 0px;
        line-height: 0.24rem;

        > *{
            font-size: 0.14rem;
        }
    }

    .vmui-form-box-vertical{
        padding-bottom: 0.09rem;

        .vmui-form-box-label{
            width: 100%;
        }
    }

    .vmui-form-box-horizontal{
        display: flex;

        .vmui-form-box-inner{
            min-height: 0.24rem;
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }

    .vmui-form-box ~ .vmui-form-box{
        border-top: 1px solid #eee;
    }

    .vmui-form-box-label{
        display: block;
        height: 0.24rem;
        color: #555;
        width: 30%;
    }

    .vmui-form-box-msg{
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
