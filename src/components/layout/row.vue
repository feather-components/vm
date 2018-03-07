<template>
	<div class="vm-box-row" @click="$emit('click')">
		<span class="vm-box-row-icon" v-if="$slots.icon">
			<slot name="icon"></slot>
		</span>
		<div class="vm-box-row-content" :style="{display: flex ? 'flex' : 'block'}">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="less">
	.vm-box-row{
		height: auto;
		display: flex;
		background: #fff;
		align-items: stretch;
		padding-left: 0.12rem;
	}

	.vm-box-row-icon{
		display: flex;
		align-items: center;
	}

	.vm-box-row-icon{
		border-bottom: 1px solid transparent;
		margin-right: 0.12rem;
	}

	.vm-box-row-content{
		flex: 1;
		align-items: center;
		padding: 0.06rem 0px;
		padding-right: 0.12rem;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}

	.vm-box-row:nth-last-child(1){
		.vm-box-row-icon, .vm-box-row-content{
			border-bottom: 0px;
		}
	}
</style>

<script>
	export default {
		name: 'row',
		props: {
			flex: {
				type: Boolean,
				default: true
			}
		}
	}
</script>