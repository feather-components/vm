<template>
    <v-box :label="label">
        <span @click="onClick(option.value)" class="vmui-tag" v-for="(option, index) in options" :class="{'vmui-tag-selected': val.indexOf(option.value) > -1}">
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

<style>
    .vmui-tag{
        display: inline-block;
        min-width: .8rem;
        height: .24rem;
        text-align: center;
        font-size: .12rem;
        color: #878787;
        border-radius: 1rem;
        box-sizing: border-box;
        border: 1px solid #878787;
        line-height: .2rem;
        margin: 0 0.24rem 0.16rem 0;
        padding: 0.02rem 0.24rem;

        &.vmui-tag-selected{
            color: #6281c2;
            border: 1px solid #6281c2;
        }
    }
</style>

<script>
    import vBox from "./box";
    import {Multiable} from './abstract';

    export default{
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
                var vals;

                if(this.size != 1){
                    vals = this.val.slice(0);
                    var index = vals.indexOf(v);

                    if(index > -1){
                        vals.splice(index, 1);
                    }else{
                        vals.push(v);
                    }
                }else{
                    vals = v;
                }

                this.save(vals, false);
            }
        }
    }
</script>
