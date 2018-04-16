<template>
	<scroll axis="x" class="vm-tabbar" ref="scroll">
		<div class="vm-tabbar-inner">
			<a v-for="(item, key) of items" @click="to(key)" :class="{'vm-tabbar-actived': key == index}" :style="{
				color: key == index ? highColor : 'inherit',
				borderBottomColor: key == index ? highColor : 'inherit'
			}">{{item.label || item}}</a>
		</div>
    </scroll>
</template>

<style lang="less">
	.vm-tabbar{
		height: .44rem;
		border-bottom: 1px solid #e1e1e1;

		.vm-tabbar-inner{
			padding: 0px 0.08rem;
		}

		a{
			color: #555;
			font-size: 0.14rem;
	        display: inline-block;
	        padding: 0px 0.08rem;
	        line-height: .44rem;
		}

		.vm-tabbar-actived{
			color: #6281C2;
			line-height: .4rem;
			border-bottom: .02rem solid #6281C2;
		}
	}
</style>

<script>
	import Scroll from '../scroll';
	import {Dom, Util} from '../../helper';

	var Tabbar = {
		name: 'tabbar',

		components: {
			Scroll
		},

		props: {
			items: {
				type: Array,
				default(){
					return [];
				}
			},

			highColor: {
				type: String,
				default(){
					return Tabbar.config('highColor');
				}
			}
		},

		data(){
			return {
				index: null
			}
		},

		mounted(){
			setTimeout(() => this.to(), 100);
		},

		methods: {
			to(index = 0){
				if(index == this.index){
					return false;
				}

				this.index = index;
				this.$emit('to', index, this.items[index]);
				this.$emit('switch', index, this.items[index]);	

				setTimeout(() => {
					let left = Dom.$('.vm-tabbar-actived', this.$el).offsetLeft;
					this.$refs.scroll.scrollTo(-left + 130, 300, true);
				}, 0);
			}
		}
	}

	Util.defineConfig(Tabbar, {
		highColor: '#6281C2'
	});
	export default Tabbar;
</script>