<template>
    <vm-page>
        <vm-topbar slot="header">
        	<vm-segment :items="{
        		'第一个': {value: 1},
        		'第二个': {value: 2},
        		'第三个': {value: 3},
        		'第四个': {value: 4}
        	}" default-key="第一个" @switch="onSwitch"/>
        </vm-topbar>
    </vm-page>
</template>

<style scoped>
p{
    margin: 10px 10px 0px 10px;
    text-align: center;
}
</style>

<script>
	import {Toast} from 'vm'

    export default {
    	methods: {
    		onSwitch(item, label){
    			Toast('点击了' + label + ', 内容为' + JSON.stringify(item));
    		}
    	}
    }
</script>