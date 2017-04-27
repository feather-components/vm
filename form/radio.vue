<template>
    <div>
        <label class="lm-label">
            <span class="lm-label-desc" v-text="title"></span>
        </label>
        <div class="lm-radio-plain" v-for="option in options">
            <input type="radio" :disabled="option.disabled" :value="option.value" v-model="currentValue">
            <label v-text="option.label"></label>
        </div>
    </div>
</template>

<script>

export default{
    name: 'v-radio',

    props: {
        title: {
            type: String,
            default: null
        },

        options: {
          type: Array,
          required: true
        },

        value: {
            type: String,
            default: ''
        } 
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