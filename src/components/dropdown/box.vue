<template>
    <vm-mask ref="container" :visible="visibility" @click="close()">
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

    var instance;

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

        watch: {
            handler(v){
                this.listenHandler(v);
            }
        },

        components: {
            Overlay,
            vmMask
        },

        computed: {
            above(){
                var bodyHeight = Dom.height(document);
                var rect = Dom.rect(this.handler);

                return rect.top + rect.height > bodyHeight/2;
            }
        },

        mounted(){
            var self = this;

            Event.on(self.$refs.overlay.$el, 'click', (e) => {
                e.stopPropagation();
            });

            self.listenHandler();
        },

        methods: {
            listenHandler(){
                this.handler && Event.on(this.handler, 'click', (e) => {
                    this.toggle();
                    e.stopPropagation();
                });
            },

            toggle(){
                this.visibility ? this.close() : this.open();
            },

            open(){
                var self = this, bottom = Dom.rect(self.handler).bottom;
                
                if(Overlay.methods.open.call(self) !== false){
                    instance && instance.close();
                    instance = self;

                    Dom.css(self.$el, {
                        top: bottom,
                        height: Dom.height(document) - bottom
                    });

                    self.$emit('open');
                }
            },

            close(){ 
                instance = null;  

                if(Overlay.methods.close.call(this) !== false){
                    this.$emit('close');
                }
            }
        }
    }
</script>