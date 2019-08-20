<template>
	<div class="vm-tabs">
        <scroll axis="x" ref="headers" :style="headersStyle">
            <div class="vm-tabs-headers">
                <a
                    v-for="(item, key) of headers"
                    :key="key"
                    :class="{
                        'vm-tabs-header': true,
                        'vm-tabs-header-actived': key == index 
                    }"
                    :style="{
                        color: key == index ? headerActiveColor : 'inherit',
                        borderBottomColor: key == index ? headerActiveColor : 'inherit'
                    }"
                    @click="onHeaderClick(key)"
                >
                    {{item.label || item}}
                </a>
            </div>
        </scroll>

        <div class="vm-tabs-panes" v-wipe="onPanesWipe">
            <div class="vm-tabs-panes-inner" ref="panes">
                <slot></slot>
            </div>
        </div>
	</div>
</template>

<script>
import Scroll from '../scroll';
import {Dom, Util, Event} from '../../helper';
import Config from '../../config';
import Wipe from '../../directives/wipe';

export default {
    name: 'tabs',

    directives: {
        Wipe
    },

    components: {
        Scroll,
        Headers
    },

    props: {
        centerLayout: {
            type: Boolean,
            default: true
        },

        headers: {
            type: Array,
            default () {
                return [];
            }
        },

        headersStyle: {
            type: [String, Object],
            default: ''
        },

        headerActiveColor: {
            type: String,
            default () {
                return Config('tabs.header-active-color') || Config('theme');
            }
        },

        defaultIndex: {
            type: Number,
            default: 0
        }
    },

    data () {
        return {
            index: null
        };
    },

    mounted () {
        this.switch(this.defaultIndex, true);
    },

    methods: {
        onPanesWipe (direction) {
            if (direction == -1 && this.index == this.headers.length - 1 || direction == 1 && this.index == 0) {
                return false;
            }

            this.switch(direction > 0 ? this.index - 1 : this.index + 1);
        },

        onHeaderClick (index) {
            this.$emit('header:click', index, this.headers[index]);
            this.switch(index);
        },

        switch (index = 0, untrigger = false) {
            if (index == this.index) {
                return false;
            }

            [].map.call(this.$refs.panes.children || [], (child, key) => {
                if (key == index || key == this.index) {
                    Dom.css(child, 'height', 'auto');
                } else {
                    Dom.css(child, 'height', '1px');
                }
            });

            this.index = index;
            this.try2scroll();
            this.fxPanes();
            !untrigger && this.$emit('switch', index, this.headers[index]);
        },

        try2scroll () {
            setTimeout(() => {
                let left = Dom.$('.vm-tabs-header-actived', this.$el).offsetLeft;

                this.$refs.headers.scrollTo(-left + 130, 300, true);
            }, 100);
        },

        fxPanes () {
            Dom.css(this.$refs.panes, 'transform', `translateX(-${this.index * 100}%)`);
        }
    }
};
</script>

<style lang="less">
.vm-tabs {
    width: 100%;
}

.vm-tabs-headers {
    box-sizing: border-box;
    padding: 0px 8px;
    width: 100%;
    white-space: nowrap;
    height: 44px;
    font-size: 14px;
    text-align: center;
    background: #fff;
}

.vm-tabs-header {
    display: inline-flex;
    margin: 0px 8px;
    height: 100%;
    align-items: center;
    font-weight: 500;
    color: #333;
    font-size: 14px;
    box-sizing: border-box;
    text-decoration: none;
}

.vm-tabs-header-actived {
    border-bottom: 4px solid #E74D4D;
    color: #E74D4D;
}

.vm-tabs-panes {
    width: 100%;
}

.vm-tabs-panes-inner {
    width: 100%;
    white-space: nowrap;
    min-height: 100px;
    transition: transform 300ms ease;
}
</style>