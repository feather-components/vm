<template>
    <v-box :label="label">
        <span slot="left" class="vumi-label-left" v-text="left"></span>
        <span slot="right" class="vumi-label-right" v-text="right"></span>
        <div class="vumi-checkbox-plain" v-for="(option,index) in options">
            <input type="checkbox" class="vumi-radio" :id="option.name+index" :disabled="option.disabled" :value="option.value" v-model="currentValue">
            <label v-text="option.label" :for="option.name+index"></label>
        </div>
    </v-box>
</template>

<style>
    .vumi-checkbox-plain{
        display: inline-block;
    }
     
    .vumi-checkbox{
        opacity: 0;
        z-index: 1;
        height: 0;
        width: 0;
        margin: 0;
    }

    .vumi-checkbox + label {
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
    }

    .vumi-checkbox:checked + label{
        color: #6281c2;
        border: 1px solid #6281c2;
    }
</style>

<script>
import vBox from "./box.vue"

export default{
    name: 'v-checkbox',

    props: {
        label: {
            type: String,
            default: null
        },

        left: {
            type: String,
            default: null
        },

        right: {
            type: String,
            default: null
        },

        options: {
          type: Array,
          required: true
        },

        value: {
            type: Array,
            default(){
                return [];
            }
        }
    },

    components: {
        vBox
    },

    data() {
        return {
            currentValue: this.value
        };
    },

    watch: {
        value(val) {
            this.currentValue = val;
        },

        currentValue(val) {
            this.$emit('input', val);
        }
    }
}
</script>