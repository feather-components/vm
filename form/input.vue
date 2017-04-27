<template>
    <v-box :label="label">
        <span slot="left" class="vumi-label-left" v-text="left"></span>
        <span slot="right" class="vumi-label-right" v-text="right"></span> 
        <input type="text" :placeholder="placeholder">
    </v-box>
</template>

<script>
import vBox from "./box.vue"

export default{
    name: 'v-input',

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

        input_value: {
            type: String,
            default: null
        }
    },

    components: {
        vBox
    },

    data() {
        return {
            currentValue: this.input_value
        };
    },

    watch: {
        input_value(val) {
            this.currentValue = val;
        },

        currentValue(val) {
            this.$emit('input', val);
        }
    }
}
</script>