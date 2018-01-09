<template>
	<span :class="{
		'vm-badge': true,
		'vm-badge-nt': !translate
	}"><slot></slot></span>
</template>

<style>
	.vm-badge{
		background: red;
		color: #fff;
		display: inline-block;
		min-width: 0.2rem;
		padding: 0px 0.06rem;
		height: 0.32rem;
		line-height: 0.32rem;
		transform: scale(0.5);
		font-size: 0.2rem;
		text-align: center;
		border-radius: 100px;
	}
</style>

<script>
	export default {
		name: 'badge'
	}
</script>