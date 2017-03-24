<template>
<div class="vmui-scroll" style="height: 300px; width: 100px; background: red;" :id="oid">
    <slot></slot>
</div>
</template>

<script>
import Scroll from 'iscroll';

export default{
    data(){
        return {
            oid: this.id || ('s' + Date.now()),
            instance: null
        }
    },

    mounted: function(){
        this.instance = new Scroll('#' + this.oid);
    },

    beforeDestroy: function(){
        this.instance.destroy();
    }
}
</script>

<style>
.vmui-scroll{
    overflow: hidden;
}
</style>