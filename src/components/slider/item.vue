<template>
    <div class="vm-slider-item">
        <slot></slot>
    </div>
</template>

<style>
    .vm-slider-item{
        overflow: hidden;
    }
</style>

<script>
    import {Event, Dom} from '../../helper';

    export default {
        name: 'slider-item',

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