<template>
    <v-box :label="label">
        <input v-if="!textarea" type="text" class="vmui-input" :name="name" :placeholder="ph" v-model="value" :val="val"/>      
        <div v-else class="vmui-textarea" contenteditable="true" v-text="result" @input="_select" ></div>
    </v-box>
</template>

<style>
.vmui-input{
    width: 100%;
    font-size: .16rem;
    color: #222222;
    line-height: .28rem;
    margin-bottom: .08rem;

    &::-webkit-input-placeholder,
    &:-moz-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder {
　　      color: #E1E1E1;
　　}
}

.vmui-textarea{
    width: 100%;
    min-height: .28rem;
    max-height: 1rem;
    height: auto;
    resize: none;
    overflow: auto;
    font-size: .16rem;
    color: #222222;
    padding-bottom: .08rem;

    &:focus {
        border: 0;
        outline: 0;
    }
}
</style>

<script>
import vBox from "./box"

export default{
    name: 'v-input',

    props: {
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

        value: {
            type: String,
            default: null
        },

        ph: {
            type: String,
            default: null
        },

        val: {
            type: String,
            default: null
        },

        textarea: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            result : null
        };
    },

    components: {
        vBox
    },

    watch: {
        value(v) {
            this._select(v);   
        },

        // result(v){
        //     console.log(1);
        //     this._select(v);
        // }
    },

    created(){
        this._select();
    },

    methods:{
        _select(v = this.val){
            console.log(this);
            this.result = this.textarea ? '' : v;
            this.$emit('input', this.result);
            this.$emit('change', this.result);
        }
    }
}
</script>