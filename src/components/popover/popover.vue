<template>
    <dropbox class="vmui-popover" ref="box" :offset="offset">
        <div class="vmui-popover-inner" ref="inner">
            <i class="vmui-popover-arrow" ref="arrow"></i>
            <a 
                href="javascript:void(0);" 
                :class="['vmui-popover-item', action.className]" 
                v-for="(action, label) of actions" 
                @click.stop="callAction(label)"
            >
                <i v-if="action.icon" :class="['icon', action.icon]"></i>
                {{label}}
            </a>
        </div>
    </dropbox>
</template>

<style lang="less">
    .vmui-popover{
        background: transparent;
        line-height: normal;

        .vmui-overlay{
            background: transparent;
            width: auto;
        }
    }

    .vmui-popover-inner{
        border-radius: 3px;
        background: #28304E;
        padding: 0px .08rem;
        margin: .12rem 0px;
    }

    .vmui-popover-item{
        display: block;
        text-decoration: none;
        color: #fff;
        padding: .08rem 0px;
        font-size: .12rem;
        text-align: left;
        border-bottom: 1px solid #ddd;

        &:last-child{
            border: 0px;
        }
    }

    .vmui-popover-arrow{
        position: absolute;
        content: "";  
        border: 8px solid transparent;  
        height: 0px;
        width: 0px;
        display: inline-block;
        border-bottom-color: #28304E; 
        top: 0.06rem;
        left: 50%;
        transform: translate(-0.08rem, -50%);
    }

    .vmui-popover-above .vmui-popover-arrow{
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
            Dropbox
        },

        mounted(){
            var self = this;

            this.$refs.box.$on('open', () => {
                setTimeout(() => {
                    var self = this;
                    var $inner = self.$refs.inner;
                    var x = self.offset.x;
                    var {width, left} = Dom.rect(self.$el.parentNode);
                    var {width: innerWidth} = Dom.rect($inner);
                    var bodyWidth = Dom.width(document);

                    var m = left + width/2;
                    var l = Math.min(
                        Math.max(m - innerWidth/2, x), 
                        bodyWidth - innerWidth - x
                    );

                    Dom.css(self.$refs.box.$refs.overlay.$el, {
                        left: l
                    });

                    Dom.css(
                        self.$refs.arrow, 
                        'left', 
                        m - l
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