<template>
    <vm-mask v-if="mask" :visible="visibility">
        <overlay :class="'vm-toast ' + className" position="center" :visible="true">
            <slot name="icon">
                <i :class="['vm-toast-icon', iconClass]" v-if="iconClass"></i>
            </slot>
            
            <slot>{{cont}}</slot>
        </overlay>
    </vm-mask>
    <overlay v-else :visible="visibility" :class="'vm-toast ' + className" position="center">
        <slot name="icon">
            <i :class="['vm-toast-icon', iconClass]" v-if="iconClass"></i>
        </slot>

        <slot>{{cont}}</slot>
    </overlay>
</template>

<style>
    .vm-toast.vm-overlay{
        font-size: 0.16rem;
        color: #FFFFFF;
        line-height: 0.28rem;
        padding: 0.08rem 0.2rem;
        max-width: 90%;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 4px;
        text-align: center;
    }

    .vm-toast-icon{
        width: .36rem;
        height: .36rem;
        display: block;
        margin: .05rem auto 0.07rem auto;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .vm-toast-success{
        font-family: "iconfont" !important;
        font-size: 0.36rem;
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
    import '../../assets/iconfont.css';

    export default{
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

        data(){
            return {
                cont: this.content,
                visibility: true
            }
        },

        watch: {
            content(v){
                this.setContent(v);
            }
        },

        components: {
            Overlay,
            vmMask
        },

        methods: {
            setContent(content){
                this.cont = content;
            }
        }
    };
</script>