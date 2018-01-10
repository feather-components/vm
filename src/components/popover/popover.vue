<template>
    <dropbox class="vm-popover" ref="box" :offset="offset">
        <vm-mask :visible="true" class="vm-popover-mask" @click="$refs.box.close()" />

        <div class="vm-popover-inner" ref="inner" :style="{background: bgColor}">
            <i class="vm-popover-arrow" ref="arrow" :style="{
                borderColor: bgColor
            }"></i>
            <a 
                href="javascript:void(0);" 
                :class="['vm-popover-item', action.className]" 
                v-for="(action, label) of actions" 
                @click.stop="callAction(label)"
                :style="{
                    color: color,
                    borderBottom: '1px solid ' + color
                }"
            >
                <i v-if="action.icon" :class="['icon', action.icon]"></i>
                {{label}}
            </a>
        </div>
    </dropbox>
</template>

<style lang="less">
    .vm-popover{
        font-weight: normal;
        line-height: normal;
        height: 100%;

        &.vm-mask{
            background: transparent !important;
        }

        .vm-overlay{
            background: transparent !important;
            width: auto;
        }

        .vm-dropbox-bottom{
            .vm-popover-arrow{
                border-bottom-color: transparent !important;
                top: 100%;
                transform: translate(-0.08rem, -10%);
            }
        }

        .vm-dropbox-top{
            .vm-popover-arrow{
                border-top-color: transparent !important;
            }
        }
    }

    .vm-popover-mask{
        width: 100% !important;
    }

    .vm-popover-inner{
        border-radius: 3px;
        padding: 0px .08rem;
        margin: .12rem 0px;
        position: relative;
        z-index: 100000;
    }

    .vm-popover-item{
        display: block;
        text-decoration: none;
        padding: .06rem 0px;
        font-size: .12rem;
        text-align: left;

        &:last-child{
            border: 0px !important;
        }

        .icon{
            float: left;
            font-size: 0.17rem;
            display: inline-block;
            margin-right: .05rem;
        }
    }

    .vm-popover-arrow{
        position: absolute;
        content: "";  
        border-width: 8px;
        border-style: solid;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
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

    var PopOver = {
        name: 'popover',

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
            },

            color: {
                type: String,
                default: () => {
                    return PopOver.config('color');
                }
            },

            bgColor: {
                type: String,
                default: () => {
                    return PopOver.config('bgColor');
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

    Util.defineConfig(PopOver, {
        color: '#fff',
        bgColor: '#28304E'
    });

    export default PopOver;
</script>