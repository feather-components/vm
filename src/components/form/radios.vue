<template>
    <cell :label="label" :vertical-layout="options.length > 3">
        <template slot="label" v-if="$slots.label">
            <slot name="label"></slot>
        </template> 

        <template slot="tips" v-if="$slots.tips && options.length > 3">
            <slot name="tips"></slot>
        </template> 

        <div class="vm-form-tags-inner">
            <button
                v-for="(option, index) in options"
                @click="onClick(option.value)"  
                :class="getClassName(option.value)"
            >{{option.label}}</button>
        </div>
    </cell>
</template>

<style>
    .vm-form-tags-inner{
        display: flex;
        flex-wrap: wrap;
        margin-start: auto;
        -webkit-margin-start: auto;
    }

    .vm-form-tag{
        width: 0.78rem;
        height: .22rem;
        font-size: .12rem;
        color: #878787;
        border-radius: 100px;
        border: 0.01rem solid #878787;
        background: #fff;
        outline: none;
        margin-top: 0.06rem;
        margin-bottom: 0.06rem;
        margin-left: 0.1rem;
    }

    .vm-form-flex .vm-form-tag{
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .vm-form-tag:nth-child(4n + 1){
        margin-left: 0px;
    }

    .vm-form-tag-selected{
        color: #6281c2;
        border: 1px solid #6281c2;
    }
</style>

<script>
    import Cell from "./cell";
    import {Single} from './abstract';
    import {Util} from '../../helper';

    var Radios = {
        name: 'radios',

        mixins: [Cell, Single],

        props: {
            options: {
                type: Array,
                required: true
            },

            selectedClassName: {
                type: String,
                default(){
                    return Radios.config('selectedClassName');
                }
            }
        },

        components: {
            Cell
        },

        methods:{
            onClick(v){
                this.val = v;
            },

            getClassName(v){
                return ['vm-form-tag', v == this.val ? this.selectedClassName : ''];
            }
        }
    }

    Util.defineConfig(Radios, {
        selectedClassName: 'vm-form-tag-selected'
    });
    export default Radios;
</script>
