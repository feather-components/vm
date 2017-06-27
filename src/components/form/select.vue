<template>
    <v-box :label="label" class="vmui-form-select-box" @icon:click="$emit('click')" :vertical-layout="false">
        <select class="vmui-form-select" :name="name" v-model="val" @click="$emit('click')">
            <option v-for="(option, index) in options" :value="option.value" selected>{{option.label}}</option>
        </select> 

        <span v-if="!val" class="vmui-form-select-placeholder">{{placeholder}}</span> 

        <i class="vmui-form-select-more"></i>   
    </v-box>
</template>

<style lang="less">
    .vmui-form-select-box .vmui-form-box-inner{
        position: relative;
    }

    .vmui-form-select-more{
        background: url(./arrow_forward_gray.png?__inline);
        background-size: 100%;
        width: 0.2rem;
        display: inline-block;
        height: 0.2rem;
    }

    .vmui-form-select{
        height: 0.24rem;
        color: #222222;
        border: 0;
        -webkit-appearance: none;
        direction: rtl;
        background: transparent;
        z-index: 1;
        width: 80%;
    }

    .vmui-form-select-placeholder{
        right: 0.2rem;
        top: 0rem;
        height: 0.24rem;
        color: #E1E1E1;
        z-index: 0;
        position: absolute;
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
            default: '请选择'
        }
    },

    components: {
        vBox
    }
}
</script>
