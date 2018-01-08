<template>
	<div class="vm-box-cell" :style="style">
		<slot></slot>
	</div>
</template>

<style>
	.vm-box-cell{
		padding: 0.1rem 0px;
		border-bottom: 1px solid #eee;
	}

	.vm-box-cell:nth-last-child(1){
		border-bottom: 0px;
	}
</style>

<script>
	export default {
		name: 'row',

		props: {
			offset: {
				type: String,
				default(){
					return this.$parent.rowOffset || '.12rem';
				}
			}
		},

		data(){
			return {
				style: {
					'margin-left': this.offset,
					'padding-right': this.offset
				}
			}
		}
	}
</script>