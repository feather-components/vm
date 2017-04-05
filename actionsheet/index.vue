<script>
import Vue from 'vue';
import Overlay from '../overlay';
import Shade from '../shade';
import Factory from '../factory';

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

    .vmui-actionsheet-cancel{
        margin: 16px 0px;
        font-weight: normal;
    }
}
</style>

<template>
<Shade :visible="visibility" :fx="true">
    <Overlay :visible="visibility" :fx="true" class="vmui-actionsheet" position="bottom">
        <ul>
            <li v-for="(action, index) in actions">
                <a href="javascript:" v-text="index" @click="callAction(index)" :class="action.className"></a>
            </li>
        </ul>
       
        <a href="javascript:" @click="close()" class="vmui-actionsheet-cancel">取消</a>
    </Overlay>
</Shade>
</template>