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

<script>
export default {
    name: 'box'
};
</script>

<style lang="less">
.vm-box {
	margin-top: 10px;
}

.vm-box-header,
.vm-box-footer {
	height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 12px;
}

.vm-box-inner {
	border-top: 1px solid #eee;
	border-bottom: 1px solid #eee;
}
</style>