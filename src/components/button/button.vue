<template>
    <button :disabled="type == 'disable' || disable || disabled" @click.prevent="$emit('click')" :class="className" :style="style"><slot></slot></button>
</template>

<style lang="less">
    .vm-button{
        min-width: 1rem;
        font-size: .16rem;
        display: inline-block;
        height: .48rem;
        box-sizing: border-box;
        color: #fff;
        display: inline-block;
        margin: auto;
        background: transparent;
        -webkit-tap-highlight-color: transparent;
        outline: none;
        border: 0px;
        word-break: keep-all;
        padding: 0px 0.15rem;

        &:active{
            opacity: 0.7;
        }
    }

    .vm-button[disabled]{
        border: 0 !important;
        color: #fff !important;
        background: #e1e1e1 !important;

        &:active{
            opacity: 1;
        }
    }

    .vm-button-small{
        min-width: 0px;
        font-size: 0.14rem;
        height: 0.32rem;
    }
</style>

<script>
    import {Util} from '../../helper';

    var Button = {
        name: 'button',

        props: {
            type: {
                type: String,
                default: 'main'
            },

            radius: {
                type: Number,
                default: () => {
                    return Button.config('radius');
                }
            },

            small: {
                type: Boolean,
                default: false
            },

            square: {
                type: Boolean,
                default: false
            },

            border: {
                type: Boolean,
                default: false
            },

            disable: {
                type: Boolean,
                default: false
            },

            disabled: {
                type: Boolean,
                default: false
            }
        },

        data(){
            return {
                color: Button.config('colors')[this.type]
            };
        },

        computed: {
            style(){
                var self = this;
                var style = {
                    'border-radius': (self.square ? '0' : self.radius) + 'px'
                };

                if(self.border){
                    style.color = self.color;
                    style.border = `1px solid ${self.color}`;
                }else{
                    style.background = self.color;
                }

                return style;
            },

            className(){
                return [
                    'vm-button', 
                    'vm-button-' + this.type, 
                    this.small ? 'vm-button-small' : ''
                ];
            }
        }
    }

    Util.defineConfig(Button, {
        radius: 100,
        colors: {
            main: 'rgb(249, 104, 84)',
            success: 'rgb(98, 129, 194)',
            drak: '#3B4263'
        }
    });

    export default Button;
</script>