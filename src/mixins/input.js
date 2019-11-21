import Model from './model';
import Config from '../config';

const INPUT_PRE_STYLES = {
    'default': 'background: #F3F6FB',
    'transparent': 'background: transparent',
    'underline': 'border-bottom: 1px solid #333',
    ...Config('input.pre-themes')
};

export default {
    mixins: [Model],

    data () {
        return {
            style: INPUT_PRE_STYLES[this.theme]
        };
    },

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

        autofocus: {
            type: Boolean,
            default: false
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
        },

        onChange () {
            this.$emit('change');
        }
    }
};