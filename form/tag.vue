<template>
    <v-box :label="label">
        <span v-text="option.label" @click="select(option.value)" class="vmui-tag" v-for="(option, index) in options" :class="{'vmui-tag-selected': isChecked(option.value)}"></span>
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
import vBox from "./box.vue";
import _ from '../helper';

export default{
    props: {
        multiple: {
            type: Boolean,
            default: false
        },

        label: {
            type: String,
            default: null
        },

        name: {
            type: String,
            default(){
                return String(Date.now());
            }
        },

        options: {
          type: Array,
          required: true
        },

        val: {
            type: [String, Array],
            default: null
        }
    },

    data(){
        return {
            value: null
        }
    },

    components: {
        vBox
    },

    watch: {
        val(v){
            this._select(v);
        }
    },

    created(){
        this._select();
    },

    methods:{
        select(v){
            if(this.multiple){
                var vals = this.value.slice(0);

                if(vals.indexOf(v) > -1){
                    vals.splice(vals.indexOf(v), 1);
                }else{
                    vals.push(v);
                }

                this._select(vals)
            }else{
                this._select(v);
            }
        },

        _select(v = this.val){
            this.value = this.multiple ? _.makeArray(v || []) : v;
            this.$emit('input', this.value);
            this.$emit('change', this.value);
        },

        isChecked(v){
            return this.multiple ? this.value.indexOf(v) > -1 : this.value == v;
        }
    }
}
</script>