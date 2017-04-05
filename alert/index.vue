<style>
.vmui-alert-content{
    color: #3B4263;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 28px;
    text-align: center;
}

.vmui-alert-extras{
    margin-top: 8px;
    margin-bottom: 16px;
    color: #555;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
}

.vmui-alert-btn{
    width: 45%;
    height: 32px;
    line-height: 32px;
    display: inline-block;
    border: 1px solid #878787;
    border-radius: 100px;
    font-size: 14px;
    color: #555555;
    margin: 0px 4px 4px 4px;
    text-decoration: none;
}

.vmui-alert-c-btn{
    background: #F96854;
    color: #fff;
    border: 1px solid #F96854;
}

.vmui-alert-s-btn{
    width: 90%;
}
</style>

<script>
import Vue from 'vue';
import Modal from '../modal';
import Factory from '../factory';

var override = (callback) => {
    return (...args) => {
        if(typeof args[1] != 'object'){
            args.splice(1, 0, {});
        }else if(!args[1]){
            args[1] = '';
        }

        return callback.apply(window, args);
    }
};

var instance = (content, extras, buttons) => {
    return Factory({
        template: Alert.template,
        components: {
            Modal
        },
        data: {
            content: content,
            extras: extras,
            buttons: buttons
        },
        methods: {
            callButton: function(index){
                var that = this.$children[0], info = this.buttons[index];

                if(typeof info == 'function'){
                    info.call(that);
                }else{
                    info.callback.call(that);
                }
            }
        }
    }).$children[0];
};

var Alert = module.exports = override((content, options, callback, manualClose) => {
    return instance(content, options.extras, options.buttons || {
        '确定': {
            className: Alert.STYLES.SINGLE,
            callback: function(){
                callback && callback();
                !manualClose && this.close();
            }
        }
    });
});

Alert.confirm = override((content, options, callback, manualClose) => {
    return instance(content, options.extras, options.buttons || {
        '取消': {
            callback: function(){
                this.close();
            }
        },

        '确定': {
            className: Alert.STYLES.CONFIRM,
            callback: function(){
                callback && callback();
                !manualClose && this.close();
            }
        }
    })
});

Alert.STYLES = {
    CONFIRM: 'vmui-alert-c-btn',
    SINGLE: 'vmui-alert-s-btn'
};
</script>

<template>
<Modal :visible="true">
    <slot>
        <div class="vmui-alert-content" v-html="content"></div>
        <div class="vmui-alert-extras" v-if="!!extras" v-text="extras"></div>
    </slot>
    <template slot="footer">
        <a href="javascript:" v-for="(props, index) in buttons" @click="callButton(index)" :class="'vmui-alert-btn ' + (props.className || '')" v-text="index"></a>
    </template>
</Modal>
</template>