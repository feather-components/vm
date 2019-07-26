<template>
	<span :class="['vm-forward-wraper', leftLayout ? 'vm-forward-ll' : '']" @click="$emit('click')">
		<a href="javascript:" class="vm-forward">
			<span class="vm-forward-content" v-if="$slots.default"><slot></slot></span>
			<icon type="right" />
		</a>
	</span>
</template>

<script>
import Icon from '../icon';
import {Dom} from '../../helper';

export default {
    name: 'forward',
    components: {
        Icon
    },

    data () {
        return {
            leftLayout: true
        };
    },

    mounted () {
		let parentNode = this.$el.parentNode;
		let display = Dom.css(parentNode, 'display');

        this.leftLayout = parentNode.childNodes[0] === this.$el;

        if (display == 'block') {
            Dom.css(parentNode, 'display', 'flex');
        }
    }
};
</script>

<style lang="less">
.vm-forward-wraper {
	display: inline-flex;
	margin-start: auto;
	-webkit-margin-start: auto;
	justify-content: flex-end;
	align-items: center;
	color: #555;
	font-size: 14px;
}

.vm-forward {
	-webkit-tap-highlight-color: transparent;
	text-decoration: none;
	display: inline-flex;
	color: inherit;
	align-items: center;

	.vm-forward-content {
		margin-right: 6px;
	}

	.vm-iconfont {
		font-weight: bold;
	}
}

.vm-forward-ll {
	margin-start: initial;
	-webkit-margin-start: auto;
	justify-content: flex-start;
}
</style>