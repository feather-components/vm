<template>
    <vm-mask ref="container" :visible="visibility">
        <overlay ref="overlay" :visible="visibility" :position="above ? 'bottom' : 'top'" :fx="true" class="vmui-dropbox">
            <slot></slot>
        </overlay>
    </vm-mask>
</template>

<style>
    .vmui-dropbox-transparent{
        background: transparent;
    }

    .vmui-dropbox{
        position: absolute;
    }
</style>

<script>
    import Overlay from '../overlay';
    import vmMask from '../mask';
    import {Util, Event, Dom} from '../../helper';

    export default{
        mixins: [Overlay],

        props: {
            handler: null,

            offset: {
                type: Object,
                default(){
                    return {
                        x: 0,
                        y: 0
                    }
                }
            }
        },

        data(){
            return {
                above: false
            };
        },
        
        components: {
            Overlay,
            vmMask
        },

        computed: {
            above(){
                var bodyHeight = Dom.height(document);
                var rect = Dom.rect(this.dom);

                return rect.top + rect.height > bodyHeight/2;
            }
        },

        mounted(){
            var self = this;

            self.handler && self.setHandler(self.handler);
            self.$nextTick(() => {
                self.initEvent();
            });
        },

        methods: {
            initEvent(){
                var $overlay = this.$refs.overlay.$el;

                Event.on(this.$refs.overlay.$el, 'click', (e) => {
                    e.stopPropagation();
                });

                Event.on(document, 'click', (e) => {   
                    if(Dom.contains($overlay, e.target)){
                        return false;
                    }

                    if(Dom.contains(this.dom, e.target)){
                        this.toggle();
                        return false;
                    }

                    this.close();
                });
            },

            setHandler(handler){
                this.dom = handler;
            },

            toggle(){
                this.visibility ? this.close() : this.open();
            },

            open(){
                var self = this, bottom = Dom.rect(self.dom).bottom;

                if(Overlay.methods.open.call(self) !== false){
                    Dom.css(self.$el, {
                        top: bottom,
                        height: Dom.height(document) - bottom
                    });

                    self.$emit('open');
                }
            },

            close(){   
                if(Overlay.methods.close.call(this) !== false){
                    this.$emit('close');
                }
            }
        }
    }
</script>