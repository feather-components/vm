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
                '头条'
               
            ]
        };
    }
};
</script>