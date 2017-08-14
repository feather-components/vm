<template>
    <grid-item class="vm-slider-item">
        <slot></slot>
    </grid-item>
</template>

<style>
    .vm-slider-item{
        overflow: hidden;
    }
</style>

<script>
    import GridItem from '../grid/item';
    import {Event, Dom} from '../../helper';

    export default {
        components: {
            GridItem
        },

        mounted(){
            this.$nextTick(() => {
                Event.on(window, 'resize', () => this.resize());
                this.resize();
            });
        },

        methods: {
            resize(){
                this.$el.style.width = Dom.width(document) + 'px';
            }
        }
    }
</script>