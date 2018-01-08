<template>
	<div class="vm-box"><slot></slot></div>
</template>

<style lang="less">
	.vm-box{
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
</style>

<script>
	export default {
		name: 'box',
		
		props: {
			rowOffset: {
				type: String,
				default: '.12rem'
			}
		}
	}
</script>