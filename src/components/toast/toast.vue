<template>
    <vm-mask v-if="mask" :visible="visibility">
        <overlay :class="'vm-toast ' + className" position="center" :visible="true">
            <span class="vm-toast-inner">
                <slot name="icon">
                    <i :class="['vm-toast-icon', iconClass]" v-if="iconClass"></i>
                </slot>

                <slot>{{cont}}</slot>
            </span>
        </overlay>
    </vm-mask>
    <overlay v-else :visible="visibility" :class="'vm-toast ' + className" position="center">
        <span class="vm-toast-inner">
            <slot name="icon">
                <i :class="['vm-toast-icon', iconClass]" v-if="iconClass"></i>
            </slot>

            <slot>{{cont}}</slot>
        </span>
    </overlay>
</template>

<style>
    .vm-toast.vm-overlay{
        text-align: center;
        width: 90%;
        background: transparent;
    }

    .vm-toast-inner{
        word-break: break-all;
        display: inline-block;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 28px;
        padding: 8px 15px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 4px;
    }

    .vm-toast-icon{
        width: 36px;
        height: 36px;
        display: block;
        margin: 5px auto 7px auto;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .vm-toast-success{
        font-family: "vm-iconfont" !important;
        font-size: 36px;
        font-style: normal;
        color: rgb(133, 205, 158);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .vm-toast-success:before{
        content: "\e68d";
    }

    .vm-toast-loading{
        background-image: url(../../assets/loading.gif);
    }
</style>

<script>
import vmMask from '../mask';
import Overlay from '../overlay';
import '../icon/iconfont.css';

export default {
    name: 'toast',

    mixins: [Overlay],

    props: {
        iconClass: {
            type: String,
            default: null
        },

        content: {
            type: String,
            default: null
        },

        mask: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            cont: this.content,
            visibility: true
        };
    },

    watch: {
        content (v) {
            this.setContent(v);
        }
    },

    components: {
        Overlay,
        vmMask
    },

    methods: {
        setContent (content) {
            this.cont = content;
        }
    }
};
</script>