<template>
    <div class="vmui-box">
        <label class="vmui-label">
            {{label}}
            <span class="vmui-label-left">
                <slot name="msg-left"></slot>
            </span>
            <span class="vmui-label-right">
                <slot name="msg-right"></slot>
            </span>
        </label>

        <slot></slot>
    </div>
</template>

<style>
    .vmui-box{
        position: relative;
        background: #fff;
        padding: 0 0.16rem 0;
        overflow: hidden;
    }

    .vmui-label{
        display: block;
        height: 0.24rem;
        font-size: 0.14rem;
        color: #222222;
        line-height: 0.24rem;
        padding: 0.1rem 0 0.08rem 0;
    }

    .vmui-label-left{
        display: inline-block;
        font-size: .1rem;
        color: #878787;
        margin-left: .025rem;
        line-height: .26rem;
    }

    .vmui-label-right{
        display: inline-block;
        float: right;
        color: #F96854;
        line-height: 2;
    }
</style>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: ''
            }
        }
    }
</script>
