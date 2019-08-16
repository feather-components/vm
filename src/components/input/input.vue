<template>  
    <div class="vm-input" :style="style">
        <div class="vm-input-helper">
            <input
                :style="{'text-align': align}"
                :placeholder="placeholder"
                :readonly="readonly"
                type="text"
                ref="input"
                @blur="onBlur"
                @focus="onFocus"
                @click="onClick"
                :maxlength="maxlength"
                v-model="val"
            />
        </div>

        <icon type="close" class="vm-input-clear" v-if="val" @click.native="onClearClick" />
    </div>
</template>

<script>
import Mixins from '../../mixins/input';
import Icon from '../icon';
import Config from '../../config';

const INPUT_PRE_STYLES = {
    'default': 'background: #F3F6FB',
    'transparent': 'background: transparent',
    'underline': 'border-bottom: 1px solid #333',
    ...Config('input.pre-themes')
};

export default {
    name: 'input',

    mixins: [Mixins],

    inject: {
        rowAlign: {
            default () {
                return 'left';
            }
        }
    },

    props: {
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
            default () {
                return this.rowAlign;
            }
        },

        theme: {
            type: String,
            default: 'default'
        }
    },

    components: {
        Icon
    },

    data () {
        return {
            style: INPUT_PRE_STYLES[this.theme]
        };
    },

    methods: {
        onClearClick () {
            this.val = '';
            this.focus();
        },

        focus () {
            this.$refs.input.focus();
        },

        blur () {
            this.$refs.input.blur();
        }
    }
};
</script>

<style lang="less">
.vm-input {
    height: 30px;
    display: flex;
    color: #333;
    flex: 1;
    align-items: center;
}

.vm-input-helper {
    flex: 1;

    input {
        caret-color: #333;
        background: transparent;
        width: 100%;
        display: inline-block;
        color: inherit;
        border: 0px;
        outline: 0px;
        font-size: 14px;

        &::-webkit-input-placeholder {
            font-weight: 300;
            opacity: 0.7;
        }
    }
}

.vm-input-clear {
    color: inherit;
    margin-left: 5px;
    font-weight: bold;
}
</style>