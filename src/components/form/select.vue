<template>
    <v-box :label="label" class="vmui-form-select-box" @icon:click="$emit('click')">
        <select class="vmui-form-select" :name="name" v-model="val">
            <option v-for="(option, index) in options" :value="option.value" v-text="option.label"></option>
        </select> 

        <span v-if="!val" class="vmui-form-select-placeholder" v-text="placeholder" @click="$emit('click')"></span> 

        <template slot="icon"></template>   
    </v-box>
</template>

<style>
    .vmui-form-select-box{
        .vmui-form-box-icon{
            height: 0.12rem;
            width: 0.12rem;
            box-shadow: 0.01rem 0.01rem #878787;
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            right: 0.04rem;
            bottom: 0.08rem;
        }
    }

    .vmui-form-select{
        position: relative;
        width: 100%;
        height: 0.28rem;
        font-size: .16rem;
        color: #222222;
        line-height: .28rem;
        border: 0;
        -webkit-appearance: none;
    }

    .vmui-form-select-placeholder{
        position: absolute;
        left: 0rem;
        top: 0rem;
        height: 0.28rem;
        font-size: .16rem;
        color: #E1E1E1;
        line-height: .28rem;
    }
</style>

<script>
import vBox from "./box";
import {Single} from './abstract';

export default{
    name: 'select',

    mixins: [vBox, Single],

    props: {
        options: {
            type: Array,
            default(){
                return [];
            }
        },

        placeholder: {
            type: String,
            default: null
        }
    },

    components: {
        vBox
    }
}
</script>
