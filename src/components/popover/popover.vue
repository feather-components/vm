<template>
    <dropbox class="vmui-popover" ref="box" :offset="offset">
        <vm-mask :visible="true" class="vmui-popover-mask" @click="$refs.box.close()" />

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
        line-height: normal;
        height: 100%;

        &.vmui-mask{
            background: transparent;
        }

        .vmui-overlay{
            background: transparent;
            width: auto;
        }

        .vmui-dropbox-bottom{
            .vmui-popover-arrow{
                border-bottom-color: transparent;
                border-top-color: #28304E; 
                top: 100%;
                transform: translate(-0.08rem, -10%);
            }
        }
    }

    .vmui-popover-mask{
        width: 100% !important;
    }

    .vmui-popover-inner{
        border-radius: 3px;
        background: #28304E;
        padding: 0px .08rem;
        margin: .12rem 0px;
        position: relative;
        z-index: 100000;
    }

    .vmui-popover-item{
        display: block;
        text-decoration: none;
        color: #fff;
        padding: .06rem 0px;
        font-size: .12rem;
        text-align: left;
        border-bottom: 1px solid #ddd;

        &:last-child{
            border: 0px;
        }

        .icon{
            float: left;
            font-size: 0.17rem;
            display: inline-block;
            margin-right: .05rem;
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
        left: 50%;
        transform: translate(-0.08rem,-90%);
    }
</style>

<script>
    import Dropbox from '../dropdown/box';
    import vmMask from '../mask';
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
            Dropbox,
            vmMask
        },

        mounted(){
            var self = this;

            self.$refs.box.$on('open', () => {
                setTimeout(() => {
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

                    self.$emit('open');
                });
            });
        },

        methods: {
            callAction(index){
                var self = this;
                var action = self.actions[index];

                if(typeof action == 'function'){
                    action.call(self);
                }else{
                    action.callback.call(self);
                }

                self.$refs.box.close();
            }
        }
    }
</script>