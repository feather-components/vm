<template>
    <div
        :class="{
            'vm-slider': true,
            'vm-slider-transition': transition,
            'vm-slider-y': axis == 'y'
        }"
        v-draggable="{axis: axis, canDrag: canDrag}"
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

    .vm-slider.vm-slider-y{
        flex-flow: column;
        width: auto;
        height: 10000000000px;
    }

    .vm-slider-transition{
        transition: transform .5s ease;
        -webkit-transition: transform .5s ease;
    }
</style>

<script>
import Draggable from '../../directives/draggable';
import {Event, Dom, Util} from '../../helper';

export default {
    name: 'slider',

    directives: {
        Draggable
    },

    props: {
        axis: {
            type: String,
            default: 'x'
        },

        offset: {
            type: Number,
            default: 0.25
        },

        defaultIndex: {
            type: Number,
            default: 0
        }
    },

    data () {
        return {
            transition: false,
            min: 0,
            index: null
        };
    },

    mounted () {
        this.$nextTick(() => {
            Event.on(this.$el, 'drag:start', this.onDragStart);
            Event.on(this.$el, 'drag:end', this.onDragEnd);
            Event.on(this.$el, 'draging', this.onDraging);
            Event.on(this.$el, 'transitionend webkitTransitionEnd', () => {
                this.complete();
            });

            this.to(this.defaultIndex, false, true);
        });
    },

    methods: {
        onDragStart (event) {
            this.transition = false;
            this.min = -(this.$el.children.length - 1) * this.getDocumentSize();
            this.$emit('drag:start');
        },

        onDraging (event) {
            this.isMoving = true;
            this.$emit('draging', event);
        },

        onDragEnd (event) {
            if (!this.isMoving) {
                return false;
            }

            this.isMoving = false;

            let start = -this.$el.children[this.index][this.axis == 'x' ? 'offsetLeft' : 'offsetTop'];

            let end = event.data[this.axis];

            let moved = end - start;

            let index = this.index + (Math.abs(moved) / this.getDocumentSize() < this.offset ? 0 : moved > 0 ? -1 : 1);

            this.$emit('drag:end');
            this.to(index);
        },

        to (index, transition = true, untrigger = false) {
            var offset = index * this.getDocumentSize();

            if (index == this.index) {
                this.$emit('reject', index);
            } else {
                var oldIndex = this.index;

                this.index = index;
                !untrigger && this.$emit('switch', this.index, oldIndex);
            }

            this.transition = transition;
            Dom.css(this.$el, 'transform', `translate${this.axis.toUpperCase()}(-${offset}px)`);
            !transition && this.complete();
        },

        complete () {
            this.transition = false;
            this.$emit('switch:complete', this.index);
        },

        canDrag (info) {
            var offset = info[this.axis];

            return offset > this.min && offset < 0;
        },

        getDocumentSize () {
            return this.axis == 'x' ? Dom.width(document) : Dom.height(document);
        }
    }
};
</script>