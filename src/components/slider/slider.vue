<template>
    <div 
        :class="{
            'vm-slider': true,
            'vm-slider-transition': transition
        }" 
        v-draggable="{axis: 'x', canDrag: canDrag}"
    >
        <slot></slot>
    </div>
</template>

<style>
    .vm-slider{
        display: flex;
        flex-flow: row;
        align-items: flex-start;
        margin-top: 0px;
        width: 100000000000px;
    }

    .vm-slider-transition{
        transition: transform .5s ease;
    }
</style>

<script>
    import Draggable from '../../directives/draggable';
    import {Event, Dom} from '../../helper';

    export default {
        name: 'slider',

        directives: {
            Draggable
        },

        props: {
            offset: {
                type: Number,
                default: 0.25
            }
        },

        data(){
            return {
                transition: false,
                min: 0,
                index: 0
            };
        },

        mounted(){
            this.$nextTick(() => {
                Event.on(this.$el, 'drag:start', this.onDragStart);
                Event.on(this.$el, 'drag:end', this.onDragEnd);
                Event.on(this.$el, 'draging', this.onDraging);
                Event.on(this.$el, 'transitionend webkitTransitionEnd', () => {
                    this.complete();
                });
            });
        },

        methods: {
            onDragStart(event){
                this.min = -(this.$el.children.length - 1) * Dom.width(document);
                this.$emit('drag:start');
            },

            onDraging(event){
                this.$emit('draging', event);
            },

            onDragEnd(event){
                let start = -this.$el.children[this.index].offsetLeft;
                let end = event.data.x;
                let moved = end - start;
                let index = this.index + (Math.abs(moved)/Dom.width(document) < 0.33 ? 0 : moved > 0 ? -1 : 1);

                this.$emit('drag:end');                
                this.to(index);
            },

            to(index, transition = true){
                var left = this.$el.children[index].offsetLeft;

                this.transition = transition;
                Dom.css(this.$el, 'transform', `translateX(-${left}px)`);

                if(index == this.index){
                    this.$emit('reject', this.index);
                }else{    
                    this.$emit('switch', this.index = index, this.index);
                }

                !transition && this.complete();
            },

            complete(){
                this.transition = false;
                this.$emit('switch:complete', this.index);
            },

            canDrag(info){
                return info.x > this.min && info.x < 0;
            }
        }
    }
</script>