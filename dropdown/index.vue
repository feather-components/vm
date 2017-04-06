<template>
<Shade ref="container" :visible="visibility">
    <Overlay ref="overlay" :visible="visibility" :position="above ? 'bottom' : 'top'" :fx="true" class="vmui-dropdown">
        <slot></slot>
    </Overlay>
</Shade>
</template>

<style>
.vmui-dropdown-transparent{
    background: transparent;
}

.vmui-dropdown{
    position: absolute;
}
</style>

<script>
import Overlay from '../overlay';
import Shade from '../shade';
import _ from '../helper';

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
        Shade
    },

    computed: {
        above(){
            var bodyHeight = _.height(document);
            var rect = _.rect(this.dom);

            return rect.top + rect.height > bodyHeight/2;
        }
    },

    mounted(){
        var self = this;

        _.on(document, 'click', () => self.close());

        self.dom = _.$(self.handler || self.$el.parentNode);
        _.on(self.dom, 'click', (e) => {
            self.toggle();
            e.stopPropagation();
        });
    },

    methods: {
        toggle(){
            this.visibility ? this.close() : this.open();
        },

        open(){
            var self = this, bottom = _.rect(self.dom).bottom;

            Overlay.methods.open.call(self);

            _.css(self.$el, {
                top: bottom,
                height: _.height(document) - bottom
            });
        },

        close(){
            Overlay.methods.close.call(this);
        }
    }
}
</script>