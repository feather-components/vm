<template>
    <i :class="'vm-icon-' + type" class="vm-iconfont" :style="style"></i>
</template>

<script>
import './iconfont.css';
import {Util} from '../../helper';

export default {
    name: 'icon',

    props: {
        type: {
            type: String,
            default: ''
        },

        size: {
            type: [String, Number],
            default: null
        },

        color: {
            type: String,
            default: ''
        }
    },

    computed: {
        style () {
            let style = {};

            if (this.size) {
                style.fontSize = Util.n2p(this.size);
            }

            if (this.color) {
                style.color = this.color;
            }

            return style;
        }
    }
};
</script>