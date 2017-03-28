<script>
import Vue from 'vue';
import Overlay from './widgets/overlay';
import Shade from './widgets/shade';
import Factory from './factory';

var instance;

var ActionSheet = module.exports = (actions) => {
    instance && instance.close();

    return instance = Factory({
        mixins: [Overlay],
        template: ActionSheet.template,
        components: {
            Shade,
            Overlay
        },
        data: {
            visibility: true,
            actions
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
    });
}
</script>

<style>
.vmui-actionsheet{
    width: 100%;
    text-align: center;
    background: transparent;

    li{
        list-style: none;
        margin-top: 10px;
    }

    a{
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

    .vmui-actionsheet-cancel{
        margin: 16px 0px;
        font-weight: normal;
    }
}
</style>

<template>
<Shade :visible="visibility">
    <Overlay :visible="true" class="vmui-actionsheet" position="bottom">
        <ul>
            <li v-for="(action, index) in actions">
                <a href="javascript:" v-text="index" @click="callAction(index)" :class="action.className"></a>
            </li>
        </ul>
       
        <a href="javascript:" @click="close()" class="vmui-actionsheet-cancel">取消</a>
    </Overlay>
</Shade>
</template>