<template>
	<scroll
        :boundary="[maxPos, 0]"
        @drag:start="onDragStart"
        @draging="onDraging"
        @drag:end="onDragEnd"
        @scrolling="onScrolling"
        @scroll:end="onScrollEnd"
        @translate="onTranslate"
        ref="scroll"
        :scrollbars="scrollbars"
    >
	    <div class="vm-pulldown2refresh" ref="status" slot="header">
         	<slot name="pull-status">
         		<slot name="if-pulldown" v-if="!isRefreshing && !isMax">下拉刷新数据</slot>
	            <slot name="if-pullleave" v-if="!isRefreshing && isMax">松手刷新数据</slot>
	            <slot name="if-refreshing" v-if="isRefreshing"><loading />正在刷新数据</slot>
         	</slot>
        </div>

        <slot></slot>
	</scroll>
</template>

<script>
import Scroll from './scroll';
import Loading from '../loading';
import Tick from '../tick';
import {Dom} from '../../helper';

export default {
    name: 'pulldown2refresh',

    props: {
        scrollbars: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            isRefreshing: false,
            isMax: false,
            maxPos: 0
        };
    },

    computed: {
        statusBoxHeight () {
            return Dom.height(this.$refs.status);
        }
    },

    components: {
        Loading,
        Tick,
        Scroll
    },

    mounted () {
        setTimeout(() => {
            this.$scroll = this.$refs.scroll;
            this.maxPos = this.statusBoxHeight;
        }, 0);
    },

    methods: {
        onScrolling (translate) {
            this.isMax = this.limitType() == 1;
            this.$emit('scrolling', translate);
        },

        onScrollEnd (...args) {
            this.$emit('scroll:end', ...args);
        },

        onTranslate (...args) {
            this.$emit('translate', ...args);  
        },

        onDragStart (...args) {
            this.$emit('drag:start', ...args);
        },

        onDraging (...args) {
            this.$emit('draging', ...args);
        },

        onDragEnd (...args) {
            this.limitType() == 1 && this.refresh();
            this.$emit('drag:end', ...args);
        },

        refresh (animation = true, trigger = true) {
            if (this.isRefreshing) return;

            this.isRefreshing = true;
            animation && this.scrollTo(-this.statusBoxHeight, 500);
            trigger && this.$emit('refresh', this.recover);
        },

        recover () {
            if (this.isRefreshing) {
                this.isRefreshing = false;
                this.scrollTo(0, 1000);
                this.$emit('recover');
            }
        },

        limitType () {
            return this.$scroll.limitType();
        },

        scrollTo (...args) {
            return this.$scroll.scrollTo(...args);
        },

        scrollToElement (...args) {
            return this.$scroll.scrollToElement(...args);
        },

        getPos () {
            return this.$scroll.getPos();
        }
    }
};
</script>

<style lang="less">
.vm-pulldown2refresh {
    padding: 10px 0px;
    color: #878787;
    width: 100%;
    font-size: 14px;
    width: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-100%);
    -webkit-transform: translateY(-100%);
}
</style>