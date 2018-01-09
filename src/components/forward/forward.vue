<template>
	<a href="javascript:" class="vm-forward">
		<span class="vm-forward-content"><slot></slot></span>
		<icon name="arrow" :size="0.12" />
	</a>
</template>

<style lang="less">
	.vm-forward{
		-webkit-tap-highlight-color: transparent;
		text-decoration: none;
		color: #222;
		font-size: .14rem;
		display: inline-flex;
		align-items: center;
		text-align: right;

		.vm-forward-content{
			margin-right: .06rem;
		}

		.vm-iconfont{
			font-weight: bold;
			float: right;
        	transform: rotate(-90deg);
    	}
	}
</style>

<script>
	import Icon from '../icon';

	export default {
		name: 'forward',
		components: {
			Icon
		},

		props: {
			left: {
				type: Boolean,
				default: null
			}
		}
	}
</script>