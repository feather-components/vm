<template>
	<span class="vm-segment" :style="containerStyle">
		<button
            v-for="(item, key) of options"
            :key="key"
            :style="index == key ? activeStyle : style"
            @click="onItemClick(key)"
        >
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

        activeColor: {
            type: String,
            default () {
                return Config('segment.active-color') || Config('theme');
            }
        },

        defaultIndex: {
            type: Number,
            default: 0
        }
    },

    data () {
        return {
            index: this.defaultIndex
        };
    },

    computed: {
        containerStyle () {
            return {
                border: '1px solid ' + this.activeColor
            };
        },

        style () {
            return {
                color: this.color,
                background: this.activeColor,
                borderColor: this.color
            };
        },

        activeStyle () {
            return {
                color: this.activeColor,
                background: this.color,
                borderColor: this.color
            };
        }
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
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
        margin: 0px;
        padding: 0px 10px;
        flex-grow: 1;
        background: transparent;
        height: 100%;
        color: #000;
        background: #fff;
        border: 0px;
        border-left: 1px solid #000;
        border-radius: 0px;
        box-sizing: border-box;
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