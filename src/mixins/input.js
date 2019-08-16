import Model from './model';

export default {
    mixins: [Model],

    props: {
        placeholder: {
            type: String,
            default: null
        },

        readonly: {
            type: Boolean,
            default: false
        },

        clearable: {
            type: Boolean,
            default: false
        },

        maxlength: {
            type: [Number, String],
            default: 100000000
        },

        theme: {
            type: String,
            default: 'default'
        }
    },
    
    methods: {
        onFocus () {
            !this.readonly && this.$emit('focus');
        },

        onBlur () {
            this.$emit('blur');
        },

        onClick () {
            this.$emit('click');
        }
    }
};