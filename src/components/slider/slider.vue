<template>
    <grid 
        :class="{
            'vm-slider': true,
            'vm-slider-transition': dragEnd
        }" 
        v-draggable="{axis: 'x', canDrag: canDrag}"
    >
        <slot></slot>
    </grid>
</template>

<style>
    .vm-slider.vm-grid{
        flex-flow: row;
        width: 100000000000px;
    }

    .vm-slider-transition{
        transition: transform .5s ease;
    }
</style>

<script>
    import Grid from '../grid/grid';
    import Draggable from '../../directives/draggable';
    import {Event, Dom} from '../../helper';

    export default {
        components: {
            Grid
        },

        directives: {
            Draggable
        },

        data(){
            return {
                dragEnd: true,
                min: 0,
                index: 0
            };
        },

        mounted(){
            this.$nextTick(() => {
                Event.on(this.$el, 'drag:start', this.onDragStart);
                Event.on(this.$el, 'drag:end', this.onDragEnd);
                Event.on(this.$el, 'draging', this.onDraging);
            });
        },

        methods: {
            onDragStart(){
                this.dragEnd = false;
                this.min = -(this.$el.children.length - 1) * Dom.width(document);
            },

            onDraging(){
                console.log(arguments);
            },

            onDragEnd(event){
                var index = Math.round(Math.abs(event.data.x) / Dom.width(document));
                var left = Dom.offset(this.$el.children[index]).left;

                Dom.css(this.$el, 'transform', `translateX(-${left}px)`);

                if(index == this.index){
                    this.$emit('reject', this.index);
                }else{    
                    this.$emit('switch', this.index, this.index = index);
                }
                
                this.dragEnd = true;
            },

            canDrag(info){
                return info.x > this.min && info.x < 0;
            }
        }
    }
</script>