<template>
    <overlay 
        class="vm-masker" 
        :visible="visibility" 
        :fx="fx" 
        @click="$emit('click')"
    >
        <slot></slot>
    </overlay>
</template>

<script>
import Overlay from '../overlay';

export default {
    mixins: [Overlay],

    name: 'masker',

    components: {
        Overlay
    }
};
</script>

<style>
.vm-masker.vm-overlay {
    overflow: hidden;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: rgba(0, 0, 0, 0.6);
}
</style>