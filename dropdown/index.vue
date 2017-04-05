<template>
<Shade :class="'vmui-dropdown' + (!useShade ? ' vmui-dropdown-transparent' : '')" ref="container" :visible="visibility">
    <Overlay ref="overlay" :visible="false" :position="above ? 'bottom' : 'top'" :fx="true">
        <slot></slot>
    </Overlay>
</Shade>
</template>

<style>
.vmui-dropdown{
    position: fixed;
    width: 100%;
    overflow: hidden;
    z-index: 1000000;

    &.vmui-dropdown-transparent{
        background: transparent;
    }

    .vmui-overlay{
        position: absolute;
    }
}
</style>

<script>
import Overlay from '../overlay';
import Shade from '../shade';
import _ from '../helper';

export default{
    mixins: [Overlay],

    props: {
        useShade: {
            type: Boolean,
            default: true
        },

        autoBind: {
            type: Boolean,
            default: true
        },

        element: null,

        visible: {
            type: Boolean,
            default: false
        },

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
            above: false,
            _inited: false,
            visibility: true,
            size: {},
            above: false
        };
    },
    
    components: {
        Overlay,
        Shade
    },

    computed: {
        fx(){
            return this._inited;
        }
    },

    mounted(){
        this.$nextTick(() => this.init());
        _.on(document, 'click', () => this.close());
    },

    methods: {
        init(){
            var self = this, $overlay;

            self.dom = _.$(this.element);

            self.visibility = true;
            $overlay = self.$overlay = self.$refs.overlay;
            $overlay.open();

            self.$nextTick(() => {  
                self.size = _.size(self.$overlay.$el);
                self._inited = true;
                self.visibility = false;
                self.$overlay.close();
            });

            this.autoBind && _.on(this.dom, 'click', (e) => {
                this.open();
                e.stopPropagation();
            });
        },

        open(){
            Overlay.methods.open.call(this);
            this.$nextTick(() => this.resetPosition());
            this.$emit('open');
        },

        resetPosition(){
            var self = this;
            var offset = _.offset(self.dom), size = _.size(self.dom);
            var bodyHeight = _.height(document), bodyWidth = _.width(document);
            var top, left, h;

            if(bodyHeight - (offset.top + size.height + self.size.height) <= 0){
                top = offset.top - self.size.height - self.offset.y;
                h = offset.top;
                self.above = true;
            }else{
                top = offset.top + size.height + self.offset.y;
                h = bodyHeight - offset.top + size.height;
                self.above = false;
            }

            left = Math.min(
                Math.max(offset.left + self.size.width/2 - size.width/2, self.offset.x), 
                bodyWidth - self.size.width - self.offset.x
            );

            _.css(self.$el, {
                left: left,
                top: top,
                height: h
            });

            self.$nextTick(() => self.$overlay.open());
        },

        close(){
            this.visibility = false;
            this.$overlay.close();
            this.$emit('close');
        }
    }
}
</script>