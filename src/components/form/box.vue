<template>
    <div class="vmui-form-box">
        <label class="vmui-form-box-label" v-if="label">
            {{label}}
            <span class="vmui-form-box-ml">
                <slot name="msg-left"></slot>
            </span>
            <span class="vmui-form-box-mr">
                <slot name="msg-right"></slot>
            </span>
        </label>

        <div class="vmui-form-box-inner">
            <slot></slot>

            <a href="javascript:" class="vmui-form-box-icon" v-if="$slots.icon" @click="$emit('icon:click')">
                <slot name="icon"></slot>
            </a>
        </div>
    </div>
</template>

<style>
    .vmui-form-box{
        background: #fff;
        margin: 0px 0.16rem;
        padding: 0.12rem 0px 0.08rem 0px;
        overflow: hidden;
        border-top: 0px;
    }

    .vmui-form-box ~ .vmui-form-box{
        border-top: 1px solid #eee;
    }

    .vmui-form-box-label{
        display: block;
        height: 0.24rem;
        font-size: 0.14rem;
        color: #222222;
        line-height: 0.24rem;
        padding-bottom: 0.02rem;
    }

    .vmui-form-box-ml{
        display: inline-block;
        font-size: .1rem;
        color: #878787;
        margin-left: .025rem;
        line-height: .26rem;
    }

    .vmui-form-box-mr{
        display: inline-block;
        float: right;
        color: #F96854;
        line-height: 2;
    }

    .vmui-form-box-inner{
        position: relative;
        min-height: 0.28rem;
    }

    .vmui-form-box-icon{
        position: absolute;
        right: 0rem;
        bottom: 0rem;
        display: inline-block;
        text-align: right;
        text-decoration: none;
        color: #333;
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

            name: {
                type: String,
                default(){
                    return String(Date.now());
                }
            }
        }
    }
</script>
