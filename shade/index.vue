<template>
<Overlay :visible="visibility" class="vmui-shade" :fx="fx" @click="$emit('click')"><slot></slot></Overlay>
</template>

<script>
import Overlay from '../overlay';

export default{
    mixins: [Overlay],

    name: 'shade',

    components: {
        Overlay
    }
}
</script>

<style>
.vmui-shade{
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.6);
}
</style>