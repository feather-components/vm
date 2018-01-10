<template>
	<span :class="['vm-forward-wraper', leftLayout ? 'vm-forward-ll' : '']">
		<a href="javascript:" class="vm-forward">
			<span class="vm-forward-content"><slot></slot></span>
			<icon name="arrow" :size="0.12" />
		</a>
	</span>
</template>

<style lang="less">
	.vm-forward-wraper{
		display: inline-flex;
		flex: 1;
		justify-content: flex-end;
		align-items: center;
		color: #222;
		font-size: .14rem;
	}

	.vm-forward{
		-webkit-tap-highlight-color: transparent;
		text-decoration: none;
		display: inline-flex;
		color: inherit;

		.vm-forward-content{
			margin-right: .06rem;
		}

		.vm-iconfont{
			font-weight: bold;
        	transform: rotate(-90deg);
    	}
	}

	.vm-forward-ll{
		justify-content: flex-start;
	}
</style>

<script>
	import Icon from '../icon';
	import {Dom} from '../../helper';

	export default {
		name: 'forward',
		components: {
			Icon
		},

		data(){
			return {
				leftLayout: true
			};
		},

		mounted(){
			let parentNode = this.$el.parentNode;

			this.leftLayout = parentNode.childNodes[0] === this.$el;

			let display = Dom.css(parentNode, 'display');

			if(display == 'block'){
				Dom.css(parentNode, 'display', 'flex');
			}
		}
	}
</script>