<template>
	<i class="vm-loading" :style="style"></i>
</template>

<script>
import Config from '../../config';

export default {
    name: 'loading',

    props: {
        size: {
            type: [Number, String],
            default: 20
        },

        color: {
            type: String,
            default () {
                return Config('loading.color') || Config('theme');
            }
        }
    },

    data () {
        return {
            style: {
                borderColor: this.color,
                width: this.size + 'px',
                height: this.size + 'px'
            }
        };
    }
};
</script>

<style lang="less">
@keyframes vm-loading-rotate{
    0% {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.vm-loading {
    margin: 0px 10px;
    box-sizing: border-box;
    border-width: 1px;
    border-left-width: 2px;
    display: inline-block;
    border-right-color: transparent !important;
    display: inline-block;
    animation: vm-loading-rotate 1.2s cubic-bezier(.5,0,.5,1) infinite;
    border-style: solid;
    border-radius: 10000px;
}
</style>