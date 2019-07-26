<template>
    <div class="vm-swipeout">    
        <div 
            :class="['vm-swipeout-content', fxing ? 'vm-swipeout-fx' : '']" 
            v-draggable="{
                axis: 'x',
                canDrag: canDrag
            }"
            ref="content"
            @drag:end="onDragEnd"
        >
            <slot></slot>
        </div>

        <div 
            class="vm-swipeout-actions" 
            ref="actions"
        >
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
import Draggable from '../../directives/draggable';
import {Dom, Event} from '../../helper';

export default {
    name: 'swipeout',

    directives: {
        Draggable
    },

    data () {
        return {
            fxing: false,
            isOpen: false
        };
    },

    mounted () {
        this.$nextTick(() => {
            this.actionsWidth = Dom.width(this.$refs.actions);
            Event.on(this.$refs.content, 'transitionend webkitTransitionEnd', () => {
                this.fxing = false;
            });

            Event.on(document.body, 'touchstart', () => {
                if (this.fxing) {
                    this.$refs.content.$draggable.cancel();
                    return false;
                }

                if (this.isOpen) {
                    this.$refs.content.$draggable.cancel();
                    this.close();
                }
            });
        });
    },

    methods: {
        onDragEnd (e) {
            e.data.x / this.actionsWidth <= -0.5 ? this.open() : this.recover();
        },

        canDrag (info) {
            return info.x < 0 && info.x >= -this.actionsWidth && !this.fxing;
        },

        toggle () {
            this.isOpen ? this.close() : this.open();
        },

        open () {
            if (this.isOpen) return false;

            this.$emit('open');
            this.fxing = true;
            this.isOpen = true;
            Dom.css(this.$refs.content, 'transform', `translateX(-${this.actionsWidth}px)`);
        },

        close () {
            if (!this.isOpen) return false;
            
            this.$emit('close');
            this.recover();
        },

        recover () {
            this.fxing = true;
            this.isOpen = false;
            Dom.css(this.$refs.content, 'transform', `translateX(0px)`);
        }
    }
};
</script>

<style lang="less">
.vm-swipeout {
    position: relative;
    -webkit-user-select: none;
}

.vm-swipeout-fx {
    transition: transform 300ms ease;
}

.vm-swipeout-content {
    position: relative;
    z-index: 1;
}

.vm-swipeout-actions {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    z-index: 0;
    display: flex;
}
</style>