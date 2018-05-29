<template>
	<div class="vm-tabbar">
		<scroll axis="x" ref="scroll" v-if="!centerLayout">
			<div class="vm-tabbar-inner">
				<a v-for="(item, key) of items" @click="onClick(key)" :class="{'vm-tabbar-actived': key == index}" :style="{
					color: key == index ? highColor : 'inherit',
					borderBottomColor: key == index ? highColor : 'inherit'
				}">{{item.label || item}}</a>
			</div>
	    </scroll>
	    <div class="vm-tabbar-inner vm-tabbar-inner-center" v-else>
	    	<a v-for="(item, key) of items" @click="onClick(key)" :class="{'vm-tabbar-actived': key == index}" :style="{
				color: key == index ? highColor : 'inherit',
				borderBottomColor: key == index ? highColor : 'inherit'
			}">{{item.label || item}}</a>
	    </div>
	</div>
</template>

<style lang="less">
	.vm-tabbar{
		height: .44rem;
		border-bottom: 1px solid #e1e1e1;
		font-size: .14rem;

		.vm-tabbar-inner{
			height: .44rem;
			padding: 0px 0.08rem;
		}

		.vm-tabbar-inner-center{
			display: flex;
			justify-content: space-around;
		}

		a{
			color: #555;
			height: .42rem;
	        display: inline-block;
	        padding: 0px 0.08rem;
	        line-height: .44rem;
		}

		.vm-tabbar-actived{
			color: #6281C2;
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
			centerLayout: {
				type: Boolean,
				default: false
			},

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
			},

			defaultIndex: {
				type: Number,
				default: 0
			}
		},

		data(){
			return {
				index: null
			}
		},

		mounted(){
			setTimeout(() => this.to(this.defaultIndex), 100);
		},

		methods: {
			onClick(index){
				this.$emit('click', index, this.items[index]);
				this.to(index);
			},

			to(index = 0, untrigger = false){
				if(index == this.index){
					return false;
				}

				this.index = index;

				if(!untrigger){
					this.$emit('to', index, this.items[index]);
					this.$emit('switch', index, this.items[index]);	
				}

				this.$refs.scroll && setTimeout(() => {
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