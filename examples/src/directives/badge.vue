<template>
    <vm-page>
        <vm-topbar slot="header">badge</vm-topbar>
        <div style="padding: 20px;">
            <span v-badge="badge">微信</span>
            <vm-badge>1234</vm-badge>
            <vm-badge>12</vm-badge>
        </div>
    </vm-page>
</template>

<script>
    export default {
    	data(){
    		return {
    			badge: ''
    		}
    	},

    	mounted(){
    		setTimeout(() => {
    			this.badge = 123;
    		}, 3000)
    	}
    }
</script>