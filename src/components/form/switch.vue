<template>
    <v-box :label="label" class="vm-form-switch-box" :vertical-layout="false"> 
        <span class="vm-form-switch">
            <input type="checkbox" :id="name" class="vm-form-switch" v-model="val" />
            <label :for="name"></label>
        </span>
    </v-box>
</template>

<style lang="less">
    .vm-form-switch{
        input{
            display: none;
        }

        label{
            position:relative;
            display: block;
            border-radius: 100px;
            height: 0.28rem;
            width: 0.48rem;
            box-shadow: 0px 0px 1px #333;
            cursor: pointer;

            &:before{
                content: '';
                display: block;
                height: 100%;
                width: 100%;
                border-radius: 100px;
                transition: all .3s ease;
            }

            &:after{
                content: '';
                position: absolute;
                top: 0px;
                left: 0px;
                height: 0.27rem;
                width: .27rem;
                border-radius: 100px;
                background-color: white;
                box-shadow: 0px 1px 0px 1px #ccc;
                transition: all .3s ease;
            }
        }

        input:checked ~ label:after{
            box-shadow: none;
            transform: translate(.2rem, 0.005rem);
        }

        input:checked ~ label:before{
            background-color: #6281C2;
        }
    }
</style>

<script>
    import vBox from './box';
    import {Single} from './abstract';

    export default{
        name: 'switch',

        mixins: [vBox, Single],

        props: {
            disabled: {
                type: Boolean,
                default: false
            }
        },

        components: {
            vBox
        },

        methods:{
            input(){
                this.val = this.$refs.input.textContent;
            }
        }
    }
</script>
