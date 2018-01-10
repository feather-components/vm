<template>
	<span class="vm-badge"><slot>{{text}}</slot></span>
</template>

<style>
	.vm-badge{
		background: #f40;
		color: #fff;
		display: inline-block;
		min-width: 0.18rem;
		padding: 0px 0.07rem;
		height: 0.32rem;
		line-height: 0.32rem;
		transform: scale(0.5);
		font-size: 0.2rem;
		text-align: center;
		border-radius: 100px;
	}

	.vm-badge:empty{
		width: 0.2rem;
		min-width: 0px;
		height: 0.2rem;
		padding: 0px;
	}
</style>

<script>
	export default {
		name: 'badge',

		props: {
			content: {
				type: String,
				default: ''
			}
		},

		data(){
			return {
				text: this.content
			}
		},

		watch: {
			content(v){
				this.setContent(v);
			}
		},

		methods: {
			setContent(content){
				this.text = content;
			}
		}
	}
</script>