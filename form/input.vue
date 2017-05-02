<template>
    <v-box :label="label"> 
        <input v-if="!textarea" type="text" class="vmui-input" :name="name" :placeholder="ph" v-model="value" /> 
        <template v-else>
            <template slot="msg-left" v-if="maxSize">{{size}}/{{maxSize}}</template> 
            <div class="vmui-textarea" contenteditable="true" v-text="result" @input="_select" ></div>
            <span v-if="!result" class="vmui-ph" v-text="ph"></span>
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
        textarea: {
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

        size: {
            type: [Number,String],
            default: 0
        },

        maxSize: {
            type: [Number,String],
            default: null
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
        }
    },

    created(){
        this._select();
    },

    methods:{
        _select(v = this.val){
            if( this.textarea ){
                this.result = this.$el ? this.$el.children[1].innerText : v;
                this.size = this.$el ? this.$el.children[1].innerText.length : v.length;
            }else{
                this.result = v;
            }
            this.$emit('input', this.result);
            this.$emit('change', this.result);
        }
    }
}
</script>