<template>
    <button :disabled="disabled" @click.prevent="$emit('click')" :class="className" :style="style">
        <slot></slot>
    </button>
</template>

<script>
import Config from '../../config';
import {Util} from '../../helper';

const SIZES = ['large', 'normal', 'small', 'mini'];

export default {
    name: 'button',

    props: {
        type: {
            type: String,
            default: 'primary'
        },

        radius: {
            type: [Number, String],
            default () {
                return Config('button.radius');
            }
        },

        size: {
            type: String,
            default: 'normal'
        },

        square: {
            type: Boolean,
            default: false
        },

        hollow: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        border: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        style () {
            const {square, radius, hollow, type, size} = this;
            const height = Config('button.sizes')[SIZES.indexOf(size)];
            const color = Config('button.colors')[type] || (type == 'primary' ? Config('theme') : type);

            let style = {
                'border-radius': square ? '0px' : Util.n2p(radius),
                'height': height
            };

            if (hollow) {
                style.color = color;
                
                if (this.border) {
                    style.border = `1px solid ${color}`;
                }
            } else {
                style.background = color;
            }

            return style;
        },

        className () {
            return [
                'vm-button',
                'vm-button-' + this.size
            ];
        }
    }
};
</script>

<style lang="less">
.vm-button {
    font-size: 14px;
    display: inline-block;
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    margin: auto;
    background: transparent;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    border: 0px;
    word-break: keep-all;
    padding: 0px 15px;
    line-height: 1;

    &:active {
        opacity: 0.7;
    }
}

.vm-button[disabled] {
    border: 0 !important;
    color: #fff !important;
    background: #e1e1e1 !important;

    &:active {
        opacity: 1;
    }
}

.vm-button-normal {
    min-width: 100px;
}

.vm-button-large {
    font-size: 16px;
    display: block;
    width: 100%;
}

.vm-button-small, .vm-button-mini {
    min-width: 0px;
    font-size: 12px;
}
</style>