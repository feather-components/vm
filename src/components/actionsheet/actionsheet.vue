<template>
    <vm-mask :visible="visibility" @click="close">
        <overlay :visible="visibility" class="vm-actionsheet" position="bottom">
            <div style="margin-bottom: 0.08rem;">
                <div 
                    v-for="(action, index) of actions"
                    class="vm-action-sheet-item"
                    @click="callAction(index)"
                    :key="index" 
                >
                    <slot name="item" :text="index">
                        <div class="vm-actionsheet-item-inner">{{index}}</div>
                    </slot>
                </div>
            </div>
            
            <div @click="close" class="vm-actionsheet-cancel" v-if="!cancelDisabled">
                <slot name="cancel">
                    <div class="vm-actionsheet-item-inner">取消</div>
                </slot>
            </div>
        </overlay>
    </vm-mask>
</template>

<style lang="less">
    .vm-actionsheet{
        width: 100%;
        text-align: center;
        background: transparent;
    }

    .vm-actionsheet-item-inner{
        margin-top: .1rem;
        text-decoration: none;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 100px;
        font-weight: bold;
        height: 46px;
        line-height: 46px;
        display: inline-block;
        width: 90%;
        font-size: 16px;
        color: #222222;
    }

    .vm-actionsheet-cancel{
        font-weight: normal;

        .vm-actionsheet-item-inner{
            margin-bottom: .16rem;
        }
    }
</style>

<script>
    import vmMask from '../mask';
    import Overlay from '../overlay';

    export default{
        name: 'actionsheet',

        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },

        mixins: [Overlay],

        props: {
            actions: {
                type: [Object, Array],
                default(){
                    return {}
                }
            },

            cancelDisabled: {
                type: Boolean,
                default: false
            }
        },

        components: {
            vmMask,
            Overlay
        },

        data(){
            return {
                visibility: this.visible
            };
        },
        
        methods: {
            callAction(index){
                this.actions[index].call(this);
            }
        }
    }
</script>