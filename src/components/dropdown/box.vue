<template>
    <vm-mask ref="mask" :visible="visibility">
        <overlay ref="overlay" :visible="visibility" :position="pos" :fx="true" :class="['vm-dropbox', 'vm-dropbox-' + pos]">
            <slot></slot>
        </overlay>
    </vm-mask>
</template>

<style>
    .vm-dropbox.vm-overlay{
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
            }
        },

        computed: {
            pos(){
                return this.above ? 'bottom' : 'top';
            }
        },

        components: {
            Overlay,
            vmMask
        },

        mounted(){
            var self = this;

            self.$nextTick(() => {
                Event.on(self.$el.parentNode, 'click', (e) => {
                    self.toggle();
                });

                Event.on(self.$refs.overlay.$el, 'click', (e) => {
                    e.stopPropagation();
                });
            });
        },

        methods: {
            toggle(){
                this.visibility ? this.close() : this.open();
            },

            open(){
                var self = this;
                
                if(Overlay.methods.open.call(self) !== false){
                    var bodyHeight = Dom.height(document);
                    var rect = Dom.rect(this.$el.parentNode);

                    self.above = rect.top + rect.height > bodyHeight/2;
                    instance && instance.close();
                    instance = self;

                    if(self.above){
                        Dom.css(self.$el, {
                            bottom: bodyHeight - rect.top,
                            height: rect.top
                        }); 
                    }else{
                        Dom.css(self.$el, {
                            top: rect.bottom,
                            height: bodyHeight - rect.bottom
                        });
                    }

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