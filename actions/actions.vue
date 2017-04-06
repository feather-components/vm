<template>
<Dropdown class="vmui-actions" ref="dropdown" :handler="handler" :offset="offset">
    <div class="vmui-actions-inner" ref="inner">
        <i class="vmui-actions-arrow" ref="arrow"></i>
        <a href="javascript:void(0);" :class="'vmui-actions-item' + (action.className || '')" v-for="(action, index) of actions" v-html="index" @click.stop="callAction(index)"></a>
    </div>
</Dropdown>
</template>

<style>
.vmui-actions{
    background: transparent;
}

.vmui-actions-inner{
    position: absolute;
    border-radius: 5px;
    background: #28304E;
    padding: 0px .12rem;
    margin: .07rem 0px;
}

.vmui-actions-item{
    display: block;
    text-decoration: none;
    color: #fff;
    padding: .12rem 0px;
    font-size: .12rem;
    border-bottom: 1px solid #ddd;

    &:last-child{
        border: 0px;
    }
}

.vmui-actions-arrow{
    position: absolute;
    content: "";  
    border: 8px solid transparent;  
    height: 0px;
    width: 0px;
    display: inline-block;
    border-bottom-color: #28304E; 
    top: -8px;
    left: 50%;
    transform: translateX(-8px);
    -webkit-transform: translateX(-8px);
}

.vmui-actions-above .vmui-actions-arrow{
    border-bottom-color: transparent;
    border-top-color: #28304E; 
    top: 100%;
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

        handler: null,
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
        this.$refs.dropdown.$on('open', () => {
            setTimeout(() => {
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
        });
    },

    methods: {
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