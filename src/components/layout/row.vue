<template>
	<div class="vm-row">
		<span class="vm-row-icon" v-if="$slots.icon">
			<slot name="icon"></slot>
		</span>
		<div class="vm-row-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
    name: 'row'
};
</script>

<style lang="less">
.vm-row {
	height: auto;
	display: flex;
	background: #fff;
	align-items: stretch;
	padding-left: 12px;
}

.vm-row-icon {
	display: flex;
	align-items: center;
}

.vm-row-icon {
	border-bottom: 1px solid transparent;
	margin-right: 12px;
}

.vm-row-content {
	display: flex;
	flex: 1;
	align-items: center;
	padding: 6px 0px;
	padding-right: 12px;
	box-sizing: border-box;
	border-bottom: 1px solid #eee;
}

.vm-row:nth-last-child(1) {
	.vm-row-icon,
	.vm-row-content {
		border-bottom: 0px;
	}
}
</style>