<template>
    <vm-page>
        <vm-topbar slot="header">tabbar</vm-topbar>
        <vm-tabbar :items="[
        	'推荐',
        	'头条',
        	'美女',
        	'游戏',
        	'旅游',
        	'军事',
        	'游戏',
        	'智能',
        	'新世界',
        	'雪碧',
        	'可乐',
        	'购物',
        	'淘宝',
        	'苏宁易购'
        ]" @to="to"></vm-tabbar>
    </vm-page>
</template>

<script>
    export default{
    	methods: {
    		to(item){
    			console.log(item)
    		}
    	}
    }
</script>