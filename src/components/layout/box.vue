<template>
	<div class="vm-box">
		<div v-if="$slots.header" class="vm-box-header">
			<slot name="header"></slot>
		</div>

		<div class="vm-box-inner">
			<slot></slot>
		</div>

		<div v-if="$slots.footer" class="vm-box-footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<style lang="less">
	.vm-box{
		margin-top: 0.1rem;
	}

	.vm-box-header, .vm-box-footer{
		height: .4rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 0.12rem;
	}

	.vm-box-inner{
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}
</style>

<script>
	export default {
		name: 'box'
	}
</script>