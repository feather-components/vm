<template>
	<span class="vm-segment" :style="{border: '1px solid ' + highColor}">
		<button v-for="(item, i) of options" :style="index == i ? highStyle : style" @click="onItemClick(i)">
            {{item.label || item}}
        </button>
	</span>
</template>

<script>
import Config from '../../config';

export default {
    name: 'segment',

    props: {
        options: {
            type: Array,
            default () {
                return [];
            }
        },

        color: {
            type: String,
            default () {
                return Config('segment.color');
            }
        },

        highColor: {
            type: String,
            default () {
                return Config('segment.high-color') || Config('theme');
            }
        },

        defaultIndex: {
            type: Number,
            default: 0
        }
    },

    data () {
        return {
            index: this.defaultIndex,
            style: {
                color: this.color,
                background: this.highColor,
                borderColor: this.color
            },
            highStyle: {
                color: this.highColor,
                background: this.color,
                borderColor: this.color
            }
        };
    },

    methods: {
        onItemClick (index) {
            this.$emit('item:click', index, this.options[index]);
            this.switch(index);
        },

        switch (index = 0) {
            if (index == this.index) {
                return false;
            }

            this.index = index;
            this.$emit('switch', index, this.options[index]);
        }
    }
};
</script>

<style lang="less">
.vm-segment {
    height: 22px;
    border-radius: 4px;
    display: flex;

    button {
        margin: 0px;
        padding: 0px 10px;
        flex-grow: 1;
        background: transparent;
        height: 100%;
        color: #000;
        background: #fff;
        border: 0px;
        border-left: 1px solid #000;
        height: 22px;
        line-height: 22px;
        border-radius: 0px;
        outline: none;
    }

    button:nth-child(1) {
        border-left: 0px;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    button:nth-last-child(1) {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
}
</style>