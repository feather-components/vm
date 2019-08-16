
<script>
import Row from './row';
import Icon from '../icon';
// import Model from '../../mixins/model';

export default {
    name: 'textinput',

    mixins: [Row],

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

        type: {
            type: String,
            default: 'text'
        },

        align: {
            type: String,
            default: 'right'
        },

        maxlength: {
            type: [Number, String],
            default: 100000000
        }
    },

    methods: {
        clear () {
            this.val = '';
            this.$emit('clear');
        },

        onInput () {
            this.val = this.$refs.input.value;
        },

        onFocus () {
            if (this.readonly) {
                this.$refs.input.blur();
            } else {
                this.$emit('focus');
            }
        }
    },

    // <input ref="input" :type="type" :name="name"
    //         @input="onInput"
    //         @focus="onFocus"
    //         @blur="$emit('blur')"
    //         @click="$emit('click')"
    //         :maxlength="maxlength"
    //         :placeholder="placeholder"
    //         :readonly="readonly"
    //         :style="{textAlign: align}"
    //     />

    //     <template slot="label" v-if="$slots.label">
    //         <slot name="label"></slot>
    //     </template>

    //     <icon name="close" v-if="clearable && val" @click.native="clear" class="vm-form-clear" :size=".14"/>

    //     <template slot="extra" v-if="$slots.extra">
    //         <slot name="extra"></slot>
    //     </template>

    render (h) {
        const {name, maxlength, placeholder, readonly} = this;

        return h(
            Row,
            {
                props: {
                    ...this.$options.propsData
                },
                scopedSlots: {
                    //...this.$scopedSlots
                }
            }
        );
    }
};
</script>

<style lang="less">
.vm-form-input {
    border: 0px;
    outline: none;
    padding: 0px;
    flex: 1;
    font-size: 14px;
    color: #222;

    &::-webkit-input-placeholder {
        font-weight: 300;
        color: #ccc;
    }
}

.vm-form-clear {
    font-weight: bold;
    margin-left: 0.1rem;
}

.vm-form-textinput-other {
    margin-left: 0.1rem;
}
</style>