<template>
    <div class="vue-slide-item">
        <slot></slot>
    </div>
</template>

<style>
    .vue-slide-item{
        overflow: hidden;
        display: block;
        width: 100%;
        height: 100%;
    }
</style>

<script>
    import {Event, Dom} from '../../helper';

    export default {
        components: {
        },

        mounted(){
            this.$nextTick(() => {
                Event.on(window, 'resize', () => this.resize());
                this.resize();
            });
        },

        methods: {
            resize(){
                // this.$el.style.width = Dom.width(document) + 'px';
                // this.$el.style.height = Dom.height(document) + 'px';
            }
        }
    }
</script>