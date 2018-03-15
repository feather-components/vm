<template>
	<span class="vm-segment" :style="{
		border: '1px solid ' + color
	}">
		<button v-for="(item, i) of items" :style="index == i ? highStyle : style" @click="to(i)">{{item.label || item}}</button>
	</span>
</template>

<style lang="less">
	.vm-segment{
		height: .22rem;
		border-radius: 4px;
		display: flex;

		button{
			margin: 0px;
			padding: 0px .1rem;
			flex-grow: 1;
			background: transparent;
			height: 100%;
			color: #000;
			background: #fff;
			border: 0px;
			border-left: 1px solid #000;
			height: .22rem;
			line-height: .22rem;
			border-radius: 0px;
			outline: none;
		}

		button:nth-child(1){
			border-left: 0px;
			border-top-left-radius: 3px;
			border-bottom-left-radius: 3px;
		}

		button:nth-last-child(1){
			border-top-right-radius: 3px;
			border-bottom-right-radius: 3px;
		}
	}
</style>

<script>
	import {Util} from '../../helper';
	import Topbar from '../topbar';

	var Segment = {
		name: 'segment',

		props: {
			items: {
				type: Array,
				default(){
					return [];
				}
			},

			color: {
				type: String,
				default(){
					return Segment.config('color');
				}
			},

			bgColor: {
				type: String,
				default(){
					return Segment.config('bgColor');
				}
			}
		},

		data(){
			return {
				index: null,
				style: {
					color: this.color,
					background: this.bgColor,
					borderColor: this.color
				},
				highStyle: {
					color: this.bgColor,
					background: this.color,
					borderColor: this.color
				}
			};
		},

		mounted(){
			this.to();
		},

		methods: {
			to(index = 0){
				if(index == this.index){
					return false;
				}

				this.index = index;
				this.$emit('switch', index, this.items[index]);
				this.$emit('to', index, this.items[index]);
			}
		}
	};

	Util.defineConfig(Segment, {
		color: Topbar.config('color'),
		bgColor: Topbar.config('bgColor')
	});

	export default Segment;
</script>