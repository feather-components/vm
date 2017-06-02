<template>
    <vm-mask v-if="mask" :visible="visibility">
        <overlay :class="className" position="center" :visible="true" v-html="content"></overlay>
    </vm-mask>
    <overlay v-else :visible="visibility" :class="className" position="center" v-html="content"></overlay>
</template>

<style>
    .vmui-toast{
        font-size: 0.16rem;
        color: #FFFFFF;
        line-height: 0.28rem;
        padding: 0.08rem 0.2rem;
        max-width: 90%;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 4px;
        text-align: center;
    }

    .vmui-toast-icon{
        width: .36rem;
        height: .36rem;
        display: block;
        margin: .05rem auto 0.07rem auto;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .vmui-toast-success .vmui-toast-icon{
        background-image: url(./success@3x.png?__inline);
    }

    .vmui-toast-loading .vmui-toast-icon{
        background-image: url(./loading.gif?__inline);
    }
</style>

<script>
    import vmMask from '../mask';
    import Overlay from '../overlay';

    export default{
        mixins: [Overlay],

        props: {
            content: {
                type: String,
                default: null
            },

            mask: {
                type: Boolean,
                default: false
            },

            className: {
                type: String,
                default: ''
            }
        },

        data(){
            return {
                visibility: true
            }
        },

        components: {
            Overlay,
            vmMask
        }
    };
</script>