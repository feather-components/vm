export default {
    props: {
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
            this.setValue(v);
        }
    },

    methods: {
        setValue (v) {
            this.val = v;
        }
    }
};