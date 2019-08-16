<script>
import Checker from './checker';
import IconChecker from './icon';
import Model from '../../mixins/model';
import { Util } from '../../helper';

export default {
    name: 'checker-group',

    mixins: [Model],

    provide () {
        return {
            _$group: this
        };
    },

    model: {
        prop: 'value',
        event: 'change'
    },

    props: {
        options: {
            type: Array,
            default: []
        },

        iconType: {
            type: Boolean,
            default: false
        },

        radio: {
            type: Boolean,
            default: false
        },

        value: null
    },

    watch: {
        val (v) {
            this.$emit('change', v);
        }
    },

    data () {
        return {
            val: this.radio ? this.value : (this.value ? Util.makeArray(this.value) : [])
        };
    },

    methods: {
        toggleValue (value) {
            if (this.radio) {
                this.val = value;
            } else {
                const i = this.index(value);
                i == -1 ? this.val.push(value) : this.val.splice(i, 1);
            }
        },

        shouldToggle (value) {
            return !this.radio || !this.contains(value) && this.radio;
        },

        contains (value) {
            return this.radio ? this.val === value : (this.index(value) > -1);
        },

        index (value) {
            return this.val.indexOf(value);
        }
    },

    render (h) {
        return h(
            'div',
            {
                class: 'vm-checker-group'
            },

            this.options.length ? 
                this.options.map((option) => {
                    return h(
                        this.iconType ? IconChecker : Checker,
                        {
                            props: {
                                ...option
                            }
                        }
                    );
                }) 
                : this.$slots.default
        );
    }
};
</script>

<style>
.vm-checker-group {
    display: flex;
    flex-wrap: wrap;
}
</style>