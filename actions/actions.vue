<template>
<Dropdown :useShade="false" ref="dropdown" :element="element" class="vmui-actions" :offset="offset" :auto-bind="false">
    <div class="vmui-actions-inner" ref="inner">
        <i class="vmui-actions-arrow" ref="arrow"></i>
        <a href="javascript:void(0);" :class="'vmui-actions-item' + (action.className || '')" v-for="(action, index) of actions" v-html="index" @click.stop="callAction(index)"></a>
    </div>
</Dropdown>
</template>

<style>
.vmui-actions{
    .vmui-overlay{
        background: transparent;
    }
}

.vmui-actions-inner{
    border-radius: 5px;
    background: #28304E;
    padding: 0px .8em;
    margin: 7px 0px;
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
    top: -6px;
    left: 50%;
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
import DropDown from '../dropdown';
import _ from '../helper';

export default{
    props: {
        actions: {
            type: Object,
            default(){
                return {};
            }
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
                    x: 5,
                    y: 5
                }
            }
        }
    },

    components: {
        Dropdown: DropDown
    },

    mounted(){
        _.on(_.$(this.element), 'click', (e) => {
            this.open();
            e.stopPropagation();
        });
    },

    methods: {
        open(){
            this.$refs.dropdown.open();
            setTimeout(() => {
                var dom = _.$(this.element);
                var offset = _.offset(dom), width = _.width(dom);
                var innerOffset = _.offset(this.$refs.inner), innerWidth = _.width(this.$refs.inner);

                _.css(
                    this.$refs.arrow, 
                    'left', 
                    Math.min(
                        Math.max(offset.left + width/2 - innerOffset.left, this.offset.x), 
                        innerWidth - this.offset.x
                    )
                );
                this.$emit('open');
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
        },

        close(){
            this.$refs.dropdown.close();
            this.$emit('close');
        }
    }
}
</script>