<template>
<Overlay :visible="visibility" class="vmui-dropdown">

</Overlay>
</template>

<style>
.vmui-dropdown{
    border: 1px solid #000;
    height: 100px;
    width: 50px;
    background: #fff;
    position: absolute;

    &:before{
        position: absolute;
        content: "";  
        border: 6px solid transparent;  
        border-bottom-color: #fff; 
        height: 0px;
        width: 0px;
        display: inline-block;
        top: -12px;
    }
}
</style>

<script>
import Overlay from '../overlay';
import _ from '../helper';

export default{
    mixins: [Overlay],

    props: {
        items: {
            type: Object,
            default(){
                return {};
            }
        },

        selector: {
            type: String,
            default: null
        },

        visible: {
            type: Boolean,
            default: true
        }
    },
    
    components: {
        Overlay
    },

    mounted(){

    },

    methods: {
        open(){
            Overlay.methods.open.call(this);

            var $el = this.$el, dom = _.$(this.selector);
            var offset = _.offset(dom), domHeight = _.height(dom), bodyHeight = _.height(document), elHeight = _.height($el);

            if(bodyHeight - (offset.top + domHeight + elHeight) <= 0){
                $el.style.top = offset.top - elHeight + 'px';
            }else{
                $el.style.top = offset.top + domHeight + 'px';
            }
        }
    }
}
</script>