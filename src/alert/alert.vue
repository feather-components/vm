<style>
.vmui-alert{
    border-radius: 4px;
    width: 60%;
    padding: 16px 10px;
}

.vmui-alert-content{
    color: #3B4263;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 28px;
    text-align: center;
}

.vmui-alert-extras{
    margin-top: 8px;
    margin-bottom: 16px;
    color: #555;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
}

.vmui-alert-footer{
    text-align: center;
    margin-top: 0.1rem;
}

.vmui-alert .vmui-button{
    width: 45%;
    margin: 0px 4px 4px 4px;
}

.vmui-alert-sbtn{
    width: 90% !important;
}
</style>

<script>
import Vue from 'vue';
import Shade from '../shade';
import Overlay from '../overlay';
import Button from '../button';

export default{
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
        Shade,
        Overlay,
        Btn: Button
    },

    data(){
        return {
            destroyed: false
        };
    },

    mounted(){
        console.log(333)
    },

    methods: {
        callButton(key){
            var props = this.buttons[key];

            if(props.callback){
                props.callback.call(this);
            }else{
                props.call(this);
            }
        },

        destroy(){
            this.destroyed = true;
        }
    }
}
</script>

<template>
    <Shade :visible="true" :fx="true" v-if="!destroyed">
        <Overlay :visible="true" class="vmui-alert" position="center">
            <div class="vmui-alert-content" v-html="content"></div>
            <div class="vmui-alert-extras" v-if="!!extras" v-text="extras"></div>
           
            <section class="vmui-alert-footer">
                <btn 
                    v-for="(button, key) of buttons" 
                    :class="button.className || ''" 
                    @click="callButton(key)" 
                    v-text="key" 
                    :small="true"
                    :border="button.props ? button.props.border : null"
                    :type="button.props ? button.props.type : null"
                ></btn>
            </section>
        </Overlay>
    </Shade>
</template>