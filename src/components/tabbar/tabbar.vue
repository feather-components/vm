<template>
	<scroll axis="x" class="vm-tabbar" ref="scroll">
		<div class="vm-tabbar-inner">
			<a v-for="(item, label) of items" @click="to(label)" :class="{'vm-tabbar-actived': label == currentLabel}">{{label}}</a>
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

	export default {
		name: 'tabbar',

		components: {
			Scroll
		},

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
			}
		},

		data(){
			return {
				currentLabel: ''
			}
		},

		mounted(){
			setTimeout(() => this.to(), 100);
		},

		methods: {
			to(label = this.defaultLabel){
				if(label == this.currentLabel){
					return false;
				}

				let item = this.items[this.currentLabel = label];
				this.$emit('to', item, label);
				this.$emit('switch', item, label);	

				setTimeout(() => {
					let left = Dom.offset(Dom.$('.vm-tabbar-actived', this.$el)).left;
					this.$refs.scroll.scrollTo(-left + 130, 300, true);
				}, 0);
			}
		}
	}
</script>