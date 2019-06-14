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

    mounted () {
        Event.on(window, 'resize', () => this.resize());
        this.resize();
    },

    methods: {
        resize () {
            this.$el.style.width = Dom.width(document) + 'px';

            if (this.$parent.axis == 'y') {
                this.$el.style.height = Dom.height(document) + 'px';
            }
        }
    }
};
</script>