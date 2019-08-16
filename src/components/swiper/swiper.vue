<template>
    <div 
        :class="classes" 
        v-draggable="draggableOptions"
        @drag:start="onDragStart"
        @draging="onDraging"
        @drag:end="onDragEnd"
    >
        <slot></slot>
    </div>
</template>

<script>
import Draggable from '../../directives/draggable';
import {Event, Dom, Util} from '../../helper';

export default {
    name: 'swiper',

    directives: {
        Draggable
    },

    props: {
        axis: {
            type: String,
            default: 'x'
        },

        ratio: {
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
            fxing: false,
            min: 0,
            index: null,
            draggableOptions: {
                axis: this.axis,
                canDrag: this.canDrag
            }
        };
    },

    computed: {
        classes () {
            return {
                'vm-swiper': true,
                'vm-swiper-fxing': this.fxing,
                'vm-swiper-y': this.axis == 'y'
            }
        }
    },

    mounted () {
        this.$nextTick(() => {
            Event.on(
                this.$el, 
                'transitionend webkitTransitionEnd', 
                this.complete.bind(this)
            );

            this.to(this.defaultIndex, false, true);
        });
    },

    methods: {
        onDragStart (event) {
            this.fxing = false;
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
            let index = this.index + (Math.abs(moved) / this.getDocumentSize() < this.ratio ? 0 : moved > 0 ? -1 : 1);

            this.$emit('drag:end');
            this.to(index);
        },

        to (index, fx = true, untrigger = false) {
            var offset = index * this.getDocumentSize();

            if (index == this.index) {
                this.$emit('reject', index);
            } else {
                var oldIndex = this.index;

                this.index = index;
                !untrigger && this.$emit('switch', this.index, oldIndex);
            }

            this.fxing = fx;
            Dom.css(this.$el, 'transform', `translate${this.axis.toUpperCase()}(-${offset}px)`);
            !fx && this.complete();
        },

        complete () {
            this.fxing = false;
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

<style>
.vm-swiper {
    display: flex;
    flex-flow: row;
    align-items: flex-start;
    margin-top: 0px;
    width: 100000000000px;
}

.vm-swiper.vm-swiper-y {
    flex-flow: column;
    width: auto;
    height: 10000000000px;
}

.vm-swiper-fxing {
    transition: transform .5s ease;
    -webkit-transition: transform .5s ease;
}
</style>