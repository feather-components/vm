<template>
    <vm-page>
        <vm-topbar slot="header">
        	<vm-segment :item="['第一个', '第二个', '第三个', '第四个']" @switch="onSwitch"/>
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
    		onSwitch(index, label){
    			Toast('点击了' + label);
    		}
    	}
    }
</script>