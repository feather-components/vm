<template>
    <vm-page>
        <vm-topbar slot="header">tabs</vm-topbar>
        <vm-tabs :headers="headers">
			<vm-tabs-pane v-for="(item, key) of headers" :key="key">
				{{item}}
			</vm-tabs-pane>
		</vm-tabs>
    </vm-page>
</template>

<script>
export default {
    data () {
        return {
            headers: [
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
            ]
        };
    }
};
</script>