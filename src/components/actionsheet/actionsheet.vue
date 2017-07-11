<template>
    <vm-mask :visible="visibility">
        <overlay :visible="visibility" class="vm-actionsheet" position="bottom">
            <ul>
                <li v-for="(action, index) of actions">
                    <a href="javascript:" v-text="index" @click="callAction(index)" :class="action.className"></a>
                </li>
            </ul>
           
            <a href="javascript:" @click="destroy()" class="vm-actionsheet-cancel">取消</a>
        </overlay>
    </vm-mask>
</template>

<style lang="less">
    .vm-actionsheet{
        width: 100%;
        text-align: center;
        background: transparent;
        
        ul{
            padding: 0px;
            margin: 0px;
        }

        li{
            padding: 0px;
            list-style: none;
            margin: 10px 0px 0px 0px;
        }

        a{
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
            margin: 16px 0px;
            font-weight: normal;
        }
    }
</style>

<script>
    import vmMask from '../mask';
    import Overlay from '../overlay';

    export default{
        name: 'actionsheet',

        mixins: [Overlay],

        props: {
            actions: {
                type: [Object, Array],
                default(){
                    return {}
                }
            }
        },

        components: {
            vmMask,
            Overlay
        },

        data(){
            return {
                visibility: true
            };
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

                self.destroy();
            }
        }
    }
</script>