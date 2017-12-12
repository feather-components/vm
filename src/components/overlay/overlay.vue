<template>
    <transition :name="transition || (fx ? 'vm-fx-' + (position || 'center') : '')">
        <div :class="className" v-show="visibility" @click="$emit('click')">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    import {Event} from '../../helper';

    export default{
        name: 'overlay',

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

        data(){
            return {
                visibility: false,
                destroyed: false
            }
        },

        watch: {
            visible(v){
                v ? this.open() : this.close();
            }
        },

        computed: {
            className(){
                var self = this;
                var c = ['vm-overlay'];

                if(self.position){
                    c.push('vm-overlay-' + self.position);
                }

                c.push(self.class || '');

                return c;
            }
        },

        mounted: function(){
            this.visible && this.open();
        },

        methods: {
            open(){
                var self = this;

                if(self.visibility) return false;

                self.visibility = true;
                self.$nextTick(function(){
                    self.$emit('open');
                });
            },

            close(){
                var self = this;

                if(!self.visibility) return false;

                self.visibility = false;
                self.$nextTick(function(){
                    self.$emit('close');
                });
            },

            destroy(fx = this.fx){
                var self = this;

                if(self.destroyed) return;

                self.close();

                if(fx){
                    Event.on(self.$el, 'transitionend webkitTransitionEnd', () => {
                        self._destroy();
                    });
                }else{
                    self._destroy();
                }
            },

            _destroy(){
                var self = this;

                self.$el.parentNode && self.$el.parentNode.removeChild(self.$el);
                self.$emit('destroy');
                self.destroyed = true;
            }
        }
    }
</script>

<style>
    .vm-overlay{
        position: fixed;
        z-index: 10000;
        background: #fff;
        overflow: hidden;
    }

    .vm-overlay-center{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
    }

    .vm-overlay-left, .vm-overlay-top{
        left: 0px;
        top: 0px;
    }

    .vm-overlay-left, .vm-overlay-right{
        height: 100%;
    }

    .vm-overlay-top, .vm-overlay-bottom{
        width: 100%;
    }

    .vm-overlay-bottom{
        bottom: 0px;
        left: 0px;
    }

    .vm-overlay-right{
        right: 0px;
        top: 0px;
    }

    .vm-fx-enter-active, .vm-fx-leave-active,
    .vm-fx-center-enter-active, .vm-fx-center-leave-active,
    .vm-fx-left-enter-active, .vm-fx-left-leave-active,
    .vm-fx-right-enter-active, .vm-fx-right-leave-active,
    .vm-fx-bottom-enter-active, .vm-fx-bottom-leave-active,
    .vm-fx-top-enter-active, .vm-fx-top-leave-active
    {
        transition: transform .3s ease, opacity .3s ease;
        -webkit-transition: transform .3s ease, opacity .3s ease;
    }

    .vm-fx-enter, .vm-fx-leave-active,
    .vm-fx-center-enter, .vm-fx-center-leave-active
    {
        opacity: 0;
    }

    .vm-fx-left-enter, .vm-fx-left-leave-active
    {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }

    .vm-fx-right-enter, .vm-fx-right-leave-active
    {
        transform: translateX(100%);
        -webkit-transform: translateX(100%);
    }

    .vm-fx-bottom-enter, .vm-fx-bottom-leave-active
    {
        transform: translateY(100%);
        -webkit-transform: translateY(100%);
    }

    .vm-fx-top-enter, .vm-fx-top-leave-active
    {
        transform: translateY(-100%);
        -webkit-transform: translateY(-100%);
    }
</style>