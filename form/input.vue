<template>
    <v-box :label="label"> 
        <input v-if="!multiline" ref="input" type="text" class="vmui-input" :name="name" :placeholder="placeholder" v-model="value" @focus="$emit('focus')" @blur="$emit('blur')" @click="$emit('click')" :readonly="readonly" /> 
        <template v-else>
            <template slot="msg-left" v-if="maxlength">{{length}}/{{maxlength}}</template> 
            <div ref="input" class="vmui-textarea" :contenteditable="!readonly" v-text="val" @input="_input"></div>
            <span v-if="!val" class="vmui-ph" v-text="placeholder"></span>
        </template>    
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
        margin-bottom: .08rem;

        &:focus {
            border: 0;
            outline: 0;
        }
    }

    .vmui-ph{
        position: absolute;
        bottom: 0.08rem;
        left: 0.16rem
        height: 0.28rem;
        font-size: .16rem;
        color: #E1E1E1;
        line-height: .28rem;
    }
</style>

<script>
import vBox from "./box"

export default{
    props: {
        multiline: {
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

        placeholder: {
            type: String,
            default: null
        },

        readonly: {
            type: Boolean,
            default: false
        },

        val: {
            type: String,
            default: null
        },

        maxlength: {
            type: Number,
            default: 50
        }
    },

    data() {
        return {
            value : ''
        };
    },

    components: {
        vBox
    },

    watch: {
        value(v) {
            this._input(v);   
        }
    },

    created(){
        this._input();
    },

    computed: {
        length(){
            return this.multiline ? this.value.length : 0;
        }
    },

    methods:{
        focus(){
            this.$refs.input.focus();
        },

        blur(){
            this.$refs.input.blur();
        },

        _input(v = this.val){
            if( this.multiline ){
                this.value = this.$el ? this.$el.children[1].innerText : v;
            }else{
                this.value = v;
            }
            this.$emit('input', this.value);
        }
    }
}
</script>
