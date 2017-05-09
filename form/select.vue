<template>
    <v-box :label="label">
        <select v-if="!native" class="vmui-select" :name="name" v-model="value">
            <option  v-for="(option, index) in options" :value="option.value" v-text="option.label"></option>
        </select> 
        <div v-else class="vmui-select" v-text="val" @click="_click">
            <slot></slot>
        </div>
        <span v-if="!value" class="vmui-select-placeholder" v-text="placeholder" @click="_click"></span>    
        <span class="vmui-select-icon" @click="_click"></span>
    </v-box>
</template>

<style>
    .vmui-select{
        position: relative;
        width: 100%;
        height: 0.28rem;
        font-size: .16rem;
        color: #222222;
        line-height: .28rem;
        margin-bottom: .08rem;
        border: 0;
        -webkit-appearance: none;
    }

    .vmui-select-placeholder{
        position: absolute;
        top: 0.42rem;
        left: 0.16rem;
        height: 0.28rem;
        height: 0.28rem;
        font-size: .16rem;
        color: #E1E1E1;
        line-height: .28rem;
    }

    .vmui-select-icon{
        display: inline-block;
        position: absolute;
        right: 0.23rem;
        top: 0.5rem;
        content: '';
        height: 0.12rem;
        width: 0.12rem;
        box-shadow: 0.01rem 0.01rem #878787;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    } 
</style>

<script>
import vBox from "./box";

export default{
    props: {
        native: {
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
            default(){
                return [];
            }
        },

        placeholder: {
            type: String,
            default: null
        },

        val: {
            type: [String, Array],
            default: null
        }
    },

    data() {
        return {
            value : null
        };
    },

    components: {
        vBox
    },

    watch: {
        value(v) {
            this._select(v);   
        },

        val(v){
            this._select(v);
        }
    },

    created(){
        this._select();
    },

    methods:{
        _select(v = this.val){
            this.value = v;
            this.$emit('input', this.value);
        },

        _click(){
            this.$emit('click', this);
        }
    }
}
</script>
