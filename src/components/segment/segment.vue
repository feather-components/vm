<template>
	<span class="vm-segment" :style="{
		border: '1px solid ' + color
	}">
		<button v-for="(item, label) of items" :style="currentLabel == label ? highStyle : style" @click="to(label)">{{label}}</button>
	</span>
</template>

<style lang="less">
	.vm-segment{
		height: .22rem;
		border-radius: 4px;
		display: flex;

		button{
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
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
		}

		button:nth-last-child(1){
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
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
				type: Object,
				default(){
					return {};
				}
			},

			defaultLabel: {
				type: String,
				default(){
					return Util.firstKey(this.items);
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
				currentLabel: '',
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
			to(label = this.defaultLabel){
				if(label == this.currentLabel){
					return false;
				}

				this.currentLabel = label;
				this.$emit('switch', this.items[label], label);
				this.$emit('to', this.items[label], label);
			}
		}
	};

	Util.defineConfig(Segment, {
		color: Topbar.config('color'),
		bgColor: Topbar.config('bgColor')
	});

	export default Segment;
</script>