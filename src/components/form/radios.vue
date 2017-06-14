<template>
    <v-box :label="label">
        <span 
            @click="onClick(option.value)" 
            v-for="(option, index) in options" 
            :class="{
                'vmui-form-tag-selected': val == option.value,
                'vmui-form-tag': true
            }"
        >
        {{option.label}}
        </span>

        <template slot="msg-left">
            <slot name="msg-left"></slot>
        </template>    

        <template slot="msg-right">
            <slot name="msg-right"></slot>
        </template>    
    </v-box>
</template>

<script>
    import vBox from "./box";
    import {Single} from './abstract';
    require('./form.css');

    export default{
        name: 'radios',

        mixins: [vBox, Single],

        props: {
            options: {
                type: Array,
                required: true
            }
        },

        components: {
            vBox
        },

        methods:{
            onClick(v){
                this.val = v;
            }
        }
    }
</script>
