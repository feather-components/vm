<template>
<Overlay :visible="visibility" :class="'vmui-actions' + (this.above ? ' vmui-actions-above' : '')" @click.stop="">
    <i class="vmui-actions-arrow" ref="arrow"></i>
    <a href="javascript:void(0);" :class="'vmui-actions-item' + (action.className || '')" v-for="(action, index) of actions" v-html="index" @click="callAction(index)"></a>
</Overlay>
</template>

<style>
.vmui-actions{
    position: absolute;
    border-radius: 5px;
    background: #28304E;
    padding: 0px .8em;
}

.vmui-actions-item{
    display: block;
    text-decoration: none;
    color: #fff;
    padding: .8em 0px;
    font-size: 12/16em;
    border-bottom: 1px solid #ddd;

    &:last-child{
        border: 0px;
    }
}

.vmui-actions-arrow{
    position: absolute;
    content: "";  
    border: 6px solid transparent;  
    height: 0px;
    width: 0px;
    display: inline-block;
    border-bottom-color: #28304E; 
    top: -12px;
    transform: translate(-6px, 1px);
}

.vmui-actions-above .vmui-actions-arrow{
    border-bottom-color: transparent;
    border-top-color: #28304E; 
    top: 100%;
    transform: translate(-6px, -1px);
}
</style>

<script>
import Overlay from '../overlay';
import _ from '../helper';

export default{
    mixins: [Overlay],

    props: {
        actions: {
            type: Object,
            default(){
                return {};
            }
        },

        element: {
            type: [String, Object],
            default: null
        },

        visible: {
            type: Boolean,
            default: false
        },

        offset: {
            type: Object,
            default(){
                return {
                    x: 5,
                    y: 5
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
        Overlay
    },

    mounted(){
        document.addEventListener('touchstart', () => this.close());
    },

    methods: {
        open(){
            Overlay.methods.open.call(this);
            this.$nextTick(() => {
                var $el = this.$el, dom = _.$(this.element);
                var offset = _.offset(dom), height = _.height(dom), width = _.width(dom);
                var bodyHeight = _.height(document), bodyWidth = _.width(document);
                var elHeight = _.height($el), elWidth = _.width($el);
                var top, left;

                if(bodyHeight - (offset.top + height + elHeight) <= 0){
                    top = offset.top - elHeight - this.offset.y;
                    this.above = true;
                }else{
                    top = offset.top + height + this.offset.y;
                    this.above = false;
                }

                var arrowLeft = offset.left + width/2;
                left = Math.min(Math.max(arrowLeft - elWidth/2, this.offset.x), bodyWidth - elWidth - this.offset.x);

                this.$refs.arrow.style.left = Math.min(Math.max(arrowLeft - left, this.offset.x), elWidth - this.offset.x) + 'px';
                $el.style.top = top + 'px';
                $el.style.left = left + 'px';
            });
        },

        callAction(index){
            var action = this.actions[index];

            if(typeof action == 'function'){
                action.call(this);
            }else{
                action.callback.call(this);
            }

            this.close();
        }
    }
}
</script>