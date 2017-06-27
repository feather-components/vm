<template>
    <v-box :label="label" class="vmui-form-checkboxes">
        <span 
            @click="onClick(option.value)" 
            v-for="(option, index) in options" 
            :class="{
                'vmui-form-tag-selected': val.indexOf(option.value) > -1,
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
    import {Multiable} from './abstract';
    require('./common.css');

    export default{
        name: 'checkboxes',

        mixins: [vBox, Multiable],

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
                var vals = this.val.slice(0);
                var index = vals.indexOf(v);

                if(index > -1){
                    vals.splice(index, 1);
                }else{
                    vals.push(v);
                }

                this.save(vals, false);
            }
        }
    }
</script>

