<script>
import Config from '../../config';
import {Util, Event} from '../../helper';

export default {
    model: {
        prop: 'checked',
        event: 'change'
    },

    inject: {
        _$group: {
            default () {
                return null;
            }
        }
    },

    props: {
        label: {
            type: [String, Number],
            default: ''
        },

        highColor: {
            type: String,
            default () {
                return Config('checker.high-color') || Config('theme');
            }
        }, 

        checked: {
            type: Boolean,
            default: false
        },

        square: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        value: ''
    },

    data () {
        return {
            selected: this.checked  
        };
    },

    watch: {
        checked (checked) {
            this.selected = checked;
        }
    },

    mounted () {
        if (this._$group) {
            this._$group.$on('change', () => {
                this.selected = this._$group.contains(this.value);
            });

            this.selected = this._$group.contains(this.value);
        }
    },

    methods: {
        onClick () {
            if (this.disabled || this._$group && !this._$group.shouldToggle(this.value)) return false;

            this.$emit('change', this.selected = !this.selected);
            this._$group && this._$group.toggleValue(this.value);
        }
    }
};
</script>

<style>
.vm-checker {
    margin-right: 10px;
}
</style>