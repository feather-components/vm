<style lang="less">
    .vm-alert.vm-overlay{
        border-radius: 4px;
        width: 65%;
        padding: 0px .1rem;
    }

    .vm-alert-content{
        color: #3B4263;
        font-size: 16px;
        letter-spacing: 0;
        line-height: 28px;
        text-align: center;
        margin-top: 0.16rem;
        margin-bottom: 0.16rem;
    }

    .vm-alert-extras{
        margin-top: 0.08rem;
        color: #555;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
    }

    .vm-alert-footer{
        text-align: center;
        margin-bottom: 0.16rem;
    }

    .vm-alert-flexfooter{
        display: flex;
        flex-wrap: wrap;
    }

    .vm-alert-btn{
        flex: 1;
        text-align: center;
        margin-bottom: 6px;

        .vm-button{
            width: 90%;
            height: 0.36rem;
        }
    }
</style>

<script>
    import vmMask from '../mask';
    import Overlay from '../overlay';
    import Button from '../button';

    export default {
        name: 'alert',

        mixins: [Overlay],

        props: {
            content: {
                type: String,
                default: ''
            },

            extras: {
                type: String,
                default: null
            },

            flex: {
                type: Boolean,
                default: false
            },

            buttons: {
                type: Object,
                default(){
                    return {};
                }
            }
        },

        components: {
            vmMask,
            Overlay,
            Btn: Button
        },

        data(){
            return {
                visibility: true
            };
        },

        methods: {
            callButton(key){
                var self = this;
                var props = self.buttons[key];

                if(props.callback){
                    return props.callback.call(self);
                }else{
                    return props.call(self);
                }
            }
        }
    }
</script>

<template>
    <vm-mask :visible="visibility">
        <overlay :visible="true" class="vm-alert" position="center">
            <div class="vm-alert-content">
                <div v-html="content"></div>
                <div class="vm-alert-extras" v-if="!!extras" v-html="extras"></div>
            </div>
            
            <div :class="['vm-alert-footer', flex ? 'vm-alert-flexfooter': '']">
                <slot name="footer">
                    <div v-for="(button, key) of buttons" class="vm-alert-btn">
                        <btn :small="true" @click="callButton(key)" 
                            :style="button.style"
                            :border="button.border"
                            :type="button.type || 'main'"
                        >{{key}}</btn>
                    </div>
                </slot>
            </div>
        </overlay>
    </vm-mask>
</template>