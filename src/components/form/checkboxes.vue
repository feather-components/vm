<template>
    <v-box :label="label" class="vm-form-checkboxes">
        <span 
            @click="onClick(option.value)" 
            v-for="(option, index) in options" 
            :class="{
                'vm-form-tag-selected': val.indexOf(option.value) > -1,
                'vm-form-tag': true
            }"
        >
        {{option.label}}
        </span>

        <template slot="msg">
            <slot name="msg"></slot>
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

