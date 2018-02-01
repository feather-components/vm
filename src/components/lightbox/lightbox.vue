<template>
	<vm-mask :visible="visibility" class="vm-lightbox" @click="close">
		<overlay :visible="visibility" position="center" style="width: 100%;">
			<slider v-lazyload @switch="onSwitch" ref="slider">
				<slider-item class="vm-lightbox-item" v-for="item of imgs">
					<img :data-src="item" />
				</slider-item>
			</slider>

			<div class="vm-lightbox-index">{{index}}/{{imgs.length}}</div>
		</overlay>
		
	</vm-mask>
	
</template>

<style lang="less">
	.vm-lightbox.vm-mask.vm-overlay{
		background: rgba(0, 0, 0, 0.8);

		img{
			max-width: 100%;
			max-height: 4rem;
		}

		.vm-overlay{
			height: 5rem;
			background: transparent;
		}

		.vm-slider{
			height: 100%;
			align-items: center;
		}
	} 

	.vm-lightbox-index{
		text-align: center;
		color: #fff;
		position: absolute;
		bottom: 0px;
		text-align: center;
		width: 100%;
	}

	.vm-lightbox-item{
		height: 100%;
		justify-content: center;
		display: flex;
		align-items: center;
	}
</style>

<script>
	import Lazyload from '../../directives/lazyload';
	import {Slider, SliderItem} from '../slider';
	import vmMask from '../mask';
	import Overlay from '../overlay';

	export default {
		name: 'lightbox',

		mixins: [vmMask],

		props: {
			items: {
				type: Array,
				default(){
					return [];
				}
			}
		},

		components: {
			Slider,
			SliderItem,
			vmMask,
			Overlay
		},

		directives: {
			Lazyload
		},

		data(){
			return {
				index: 1,
				imgs: []
			};
		},

		watch: {
			items(v){
				this.updateItems(v);
			}
		},

		mounted(){
			this.updateItems(this.items);
		},

		methods: {
			onSwitch(index){
				this.index = index + 1;
			},

			to(index, transition){
				this.$refs.slider.to(index, transition);
			},

			updateItems(items = []){
				this.imgs = items;
			}
		}
	}
</script>