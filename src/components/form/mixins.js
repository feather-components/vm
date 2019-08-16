export default {
    props: {
        label: {
            type: String,
            default: null
        },

        name: {
            type: String,
            default () {
                return String(Date.now());
            }
        },

        value: null
    },

    data () {
        return {
            val: this.value
        };
    },

    watch: {
        val (v) {
            this.$emit('input', v);
        },

        value (v) {
            this.val = v;
        }
    }
};