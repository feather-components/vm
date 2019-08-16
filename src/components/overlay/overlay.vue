<template>
    <transition :name="transition || (fx ? 'vm-fx-' + (position || 'center') : '')">
        <div :class="className" v-show="visibility" @click="$emit('click')">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import {Event} from '../../helper';

export default {
    name: 'overlay',

    model: {
        prop: 'visible',
        event: 'update:visible'
    },

    props: {
        fx: {
            type: Boolean,
            default: true
        },

        visible: {
            type: Boolean,
            default: false
        },

        position: {
            type: String,
            default: null
        },

        transition: {
            type: String,
            default: null
        }
    },

    data () {
        return {
            visibility: false,
            destroyed: false
        };
    },

    watch: {
        visible (v) {
            v ? this.show() : this.hide();
        },

        visibility (v) {
            this.$emit('update:visible', v);
        }
    },

    computed: {
        className () {
            var c = ['vm-overlay'];

            if (this.position) {
                c.push('vm-overlay-' + this.position);
            }

            c.push(this.class || '');

            return c;
        }
    },

    mounted: function () {
        this.visible && this.show();
    },

    methods: {
        show () {
            if (this.visibility) return false;

            this.visibility = true;
            this.$nextTick(function () {
                this.$emit('show');
            });
        },

        hide () {
            if (!this.visibility) return false;

            this.visibility = false;
            this.$nextTick(function () {
                this.$emit('hide');
            });
        },

        destroy (fx = this.fx) {
            if (this.destroyed) return;

            this.hide();

            if (fx) {
                Event.on(this.$el, 'transitionend webkitTransitionEnd', () => {
                    this._destroy();
                });
            } else {
                this._destroy();
            }
        },

        _destroy () {
            this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
            this.$emit('destroy');
            this.destroyed = true;
        }
    }
};
</script>

<style>
.vm-overlay {
    position: fixed;
    z-index: 10000;
}

.vm-overlay-center {
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    white-space: nowrap; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.vm-overlay-left,
.vm-overlay-top {
    left: 0px;
    top: 0px;
}

.vm-overlay-left,
.vm-overlay-right {
    height: 100%;
}

.vm-overlay-top,
.vm-overlay-bottom {
    width: 100%;
}

.vm-overlay-bottom {
    bottom: 0px;
    left: 0px;
}

.vm-overlay-right {
    right: 0px;
    top: 0px;
}

.vm-fx-enter-active,
.vm-fx-leave-active,
.vm-fx-center-enter-active,
.vm-fx-center-leave-active,
.vm-fx-left-enter-active,
.vm-fx-left-leave-active,
.vm-fx-right-enter-active,
.vm-fx-right-leave-active,
.vm-fx-bottom-enter-active,
.vm-fx-bottom-leave-active,
.vm-fx-top-enter-active,
.vm-fx-top-leave-active {
    transition: transform .3s ease, opacity .3s ease;
    -webkit-transition: transform .3s ease, opacity .3s ease;
}

.vm-fx-enter,
.vm-fx-leave-active,
.vm-fx-center-enter,
.vm-fx-center-leave-active {
    opacity: 0;
}

.vm-fx-left-enter,
.vm-fx-left-leave-active {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
}

.vm-fx-right-enter,
.vm-fx-right-leave-active {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
}

.vm-fx-bottom-enter,
.vm-fx-bottom-leave-active {
    transform: translateY(100%);
    -webkit-transform: translateY(100%);
}

.vm-fx-top-enter,
.vm-fx-top-leave-active {
    transform: translateY(-100%);
    -webkit-transform: translateY(-100%);
}
</style>