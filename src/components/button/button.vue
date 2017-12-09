<template>
    <button :class="className" :disable="type == 'disable' || disable" @click="$emit('click')" :style="{'border-radius': (square ? '0' : radius) + 'px'}"><slot></slot></button>
</template>

<style lang="less">
    .vm-button{
        min-width: 1rem;
        text-align: center;
        font-size: .16rem;
        height: .48rem;
        box-sizing: border-box;
        color: #fff;
        background: rgb(249, 104, 84);
        display: inline-block;
        border: 0px;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        outline: none;
        margin: auto;
    }

    .vm-button-main:active{
        background: rgb(199, 83, 67);
    }

    .vm-button-main.vm-button-border{
        background: #fff;
        color: rgb(249, 104, 84);
        border: 1px solid rgb(249, 104, 84);

        &:active{
            background: #FFA07A;
        }
    }

    .vm-button-success{
        background: rgb(98, 129, 194);

        &:active{
            background: rgb(78, 103, 155);
        }
    }

    .vm-button-success.vm-button-border{
        color: rgb(98, 129, 194);
        background: #fff;
        border: 1px solid rgb(98, 129, 194);

        &:active{
            background: rgb(170, 186, 218);
        }
    }

    .vm-button-drak{
        background: #3B4263;

        &:active{
            background: rgb(47, 52, 79);
        }
    }

    .vm-button-drak.vm-button-border{
        background: #fff;
        border: 1px solid rgb(180, 180, 180);  
        color: rgb(85, 85, 85);

        &:active{
            background: rgb(225, 225, 225);
        }
    }

    .vm-button-disable{
        border: 0 !important;
        color: #fff !important;
        background: #e1e1e1 !important;
    }

    .vm-button-small{
        font-size: 0.14rem;
        height: 0.32rem;
    }
</style>

<script>
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
                    return Button.radius;
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
            }
        },

        computed: {
            className(){
                var self = this;

                if(self.class) return self.class;

                var {border, square, small} = self;
                var className = ['vm-button', 'vm-button-' + self.type];

                small && className.push('vm-button-small');
                border && className.push('vm-button-border');
                square && className.push('vm-button-square');

                return className;
            }
        }
    }

    Button.radius = 100;
    export default Button;
</script>