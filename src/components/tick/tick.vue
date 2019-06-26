<template>
	<span class="vm-tick" :style="style">✔</span>
</template>

<script>
import Config from '../../config';

export default {
    name: 'tick',

    props: {
        size: {
            type: [Number, String],
            default: 20
        },

        color: {
            type: String,
            default () {
                return Config('tick.color') || Config('theme');
            }
        }
    },

    data () {
        return {
            style: {
                fontSize: this.size + 'px',
                color: this.color
            }
        };
    }
};
</script>