<style>
    .vm-alert.vm-overlay{
        border-radius: 4px;
        width: 60%;
        padding: 16px 10px;
    }

    .vm-alert-content{
        color: #3B4263;
        font-size: 16px;
        letter-spacing: 0;
        line-height: 28px;
        text-align: center;
    }

    .vm-alert-extras{
        margin-top: 8px;
        margin-bottom: 16px;
        color: #555;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
    }

    .vm-alert-footer{
        text-align: center;
        margin-top: 0.1rem;
    }
    .vm-alert-btncon{
        display: inline-block;
    }
    .vm-alert .vm-button{
        
        width: 90%;
        margin: 0px 4px 4px 4px;
    }

    .vm-alert .vm-alert-cbtn{
        width: 45%;
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
                    props.callback.call(self);
                }else{
                    props.call(self);
                }
            }
        }
    }
</script>

<template>
    <vm-mask :visible="visibility">
        <overlay :visible="true" class="vm-alert" position="center">
            <div class="vm-alert-content" v-html="content"></div>
            <div class="vm-alert-extras" v-if="!!extras" v-text="extras"></div>
           
            <section class="vm-alert-footer">
               <div v-for="(button, key) of buttons" class="vm-alert-btncon">
                    <btn 
                    :class="button.className || ''" 
                    @click="callButton(key)" 
                    v-text="key" 
                    :small="true"
                    :border="button.props ? button.props.border : null"
                    :type="button.props ? button.props.type : null"
                ></btn>
                </div>
            </section>
        </overlay>
    </vm-mask>
</template>