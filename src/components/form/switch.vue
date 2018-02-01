<template>
    <cell :label="label" class="vm-form-switch-box" :vertical-layout="false"> 
        <span class="vm-form-switch">
            <input type="checkbox" :id="name" ref="checkbox" class="vm-form-switch" v-model="val" @change="onChange" />
            <label :for="name">
                <i :style="{background: bgColor}"></i>
                <i></i>
            </label>
        </span>
    </cell>
</template>

<style lang="less">
    .vm-form-switch{
        margin-start: auto;
        -webkit-margin-start: auto;

        input{
            display: none;
        }

        label{
            position:relative;
            display: block;
            border-radius: 100px;
            height: 0.28rem;
            width: 0.48rem;
            box-shadow: 0px 0px 1px #ccc;
            cursor: pointer;

            i:nth-child(1){
                display: block;
                height: 100%;
                width: 100%;
                border-radius: 100px;
                transition: all .3s ease;
            }

            i:nth-child(2){
                position: absolute;
                display: inline-block;
                top: 0px;
                left: 0px;
                height: 0.27rem;
                width: .27rem;
                border-radius: 100px;
                background-color: white;
                box-shadow: 0px 1px 0px 1px #ddd;
                transition: all .3s ease;
            }
        }

        input:checked ~ label i:nth-child(2){
            box-shadow: none;
            transform: translate(.2rem, 0.005rem);
        }
    }
</style>

<script>
    import Cell from './cell';
    import {Single} from './abstract';
    import {Util} from '../../helper';

    var Switch = {
        name: 'switch',

        mixins: [Cell, Single],

        props: {
            disabled: {
                type: Boolean,
                default: false
            },

            color: {
                type: String,
                default(){
                    return Switch.config('color');
                }
            }
        },

        components: {
            Cell
        },

        data(){
            return {
                bgColor: ''
            };
        },

        mounted(){
            this.onChange();
        }, 

        methods: {
            onChange(){
                this.bgColor = this.$refs.checkbox.checked ? this.color : '';
            }
        }
    }

    Util.defineConfig(Switch, {
        color: '#6281c2'
    });

    export default Switch;
</script>
