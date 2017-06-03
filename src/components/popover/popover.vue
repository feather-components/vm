<template>
    <dropbox class="vmui-actions" ref="box" :handler="handler" :offset="offset">
        <div class="vmui-actions-inner" ref="inner">
            <i class="vmui-actions-arrow" ref="arrow"></i>
            <a href="javascript:void(0);" :class="'vmui-actions-item' + (action.className || '')" v-for="(action, index) of actions" v-html="index" @click.stop="callAction(index)"></a>
        </div>
    </dropbox>
</template>

<style lang="less">
    .vmui-actions{
        background: transparent;

        .vmui-overlay{
            background: transparent;
        }
    }

    .vmui-actions-inner{
        float: left;
        position: relative;
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
        top: -14px;
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
    import Dropbox from '../dropdown/box';
    import {Util, Event, Dom} from '../../helper';

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
            Dropbox: Dropbox
        },

        mounted(){
            var self = this;

            self.dom = _.$(self.handler);

            this.$refs.box.$on('open', () => {
                setTimeout(() => {
                    var self = this;
                    var $inner = self.$refs.inner;
                    var x = self.offset.x;
                    var {width, left} = _.rect(self.dom);

                    var {width: innerWidth, left: innerLeft} = _.rect($inner);
                    var bodyWidth = _.width(document);

                    var m = left + width/2;
                    var l = Math.min(
                        Math.max(m - innerWidth/2, x), 
                        bodyWidth - innerWidth - x
                    );

                    _.css($inner, {
                        left: l
                    });

                    _.css(
                        self.$refs.arrow, 
                        'left', 
                        innerWidth/2
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

                this.$refs.box.close();
            }
        }
    }
</script>