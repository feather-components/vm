<template>
	<scroll 
        :max-pos="maxPos" 
        @scrolling="onScrolling"
        @scroll:end="onScrollEnd" 
        @drag:start="onDragStart"
        @drag:end="onDragEnd" 
        ref="scroll"
        :scrollbars="true"
    >
	    <div class="vm-pulldown2refresh" ref="pulldown" slot="header">
         	<slot name="pulldown">
         		<slot name="pulldown-msg" v-if="!isRefreshing && !intop">下拉刷新数据</slot>
	            <slot name="pullleave-msg" v-if="!isRefreshing && intop">松手刷新数据</slot>
	            <slot name="refresh-msg" v-if="isRefreshing"><i class="vm-pulldown2refresh-icon"></i>正在刷新数据</slot>
         	</slot>
        </div>

        <slot></slot>
	</scroll>
</template>

<style>
    .vm-pulldown2refresh-icon{
        display: inline-block;
        width: 0.16rem;
        height: 0.16rem;
        background-image: url(../../assets/loading.gif?__inline);
        background-size: 100%;
        margin-right: 0.05rem;
        transform: translateY(0.03rem);
        -webkit-transform: translateY(0.03rem);
    }


    .vm-pulldown2refresh{
        text-align: center;
        padding: 0.05rem;
        color: #878787;
        width: 100%;
        font-size: 0.12rem;
        width: 100%;
        position: absolute;
        transform: translateY(-100%);
        -webkit-transform: translateY(-100%);
    }
</style>

<script>
	import Scroll from './scroll';
	import {Dom} from '../../helper';

	export default {
		name: 'pulldown2refresh',

		components: {
			Scroll
		},

		data(){
			return {
				maxPos: 0,
                isRefreshing: false,
                intop: false
			};
		},

        computed: {
            pulldownHeight(){
                return Dom.height(this.$refs.pulldown);
            }
        },

        components: {
            Scroll
        },

        mounted(){
            setTimeout(() => {   
                this.$scroll = this.$refs.scroll;
                this.maxPos = this.pulldownHeight;
            }, 0);
        },

        methods: {
            onScrolling(translate){
                this.intop = this.limitType() == 1;
                this.$emit('scrolling', translate);
            },

            onScrollEnd(...args){
                this.$emit('scroll:end', ...args);
            },

            onDragStart(...args){
                this.$emit('drag:start', ...args);
            },

            onDragEnd(translate, destination, duration){
                this.$emit('drag:end', translate, destination, duration);
                this.limitType() == 1 && this.refresh();
            },  

            refresh(trigger = true){
                trigger && this.$emit('refresh', this.recover);
                this.isRefreshing = true; 
                setTimeout(() => this.scrollTo(this.pulldownHeight), 0);
            },

            recover(){
                this.isRefreshing && this.scrollTo(0, 500);
                this.isRefreshing = false;
                this.$emit('recover');
            },

            limitType(){
                return this.$scroll.limitType();
            },

            scrollTo(translate, duration){
                return this.$scroll.scrollTo(translate, duration);
            },

            getPos(){
                return this.$scroll.getPos();
            }
        }
	}
</script>