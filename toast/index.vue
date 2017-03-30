<style>
.vmui-toast{
    font-size: 16px;
    color: #FFFFFF;
    line-height: 28px;
    padding: 8px 20px;
    max-width: 90%;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    text-align: center;
}

.vmui-toast-icon{
    width: 36px;
    height: 36px;
    display: block;
    margin: 5px auto 7px auto;
}

.vmui-toast-success .vmui-toast-icon{
    background: url(./success@3x.png);
}
</style>

<script>
import Vue from 'vue';
import Shade from '../shade';
import Overlay from '../overlay';
import Factory from '../factory';

var instance = null, timeid;

var Toast = module.exports = (content, time, useShade, className = '') => {
    Toast.destroy();

    if(time){
        timeid = setTimeout(Toast.destroy, time);
    }

    return instance = Factory({
        template: Toast.template,
        components: {
            Shade,
            Overlay
        },
        data: {
            className: 'vmui-toast ' + className,
            content: content,
            useShade: useShade,
            visible: true
        }
    })
};

Toast.destroy = () => {
    if(timeid){
        clearTimeout(timeid);
        timeid = null;
    }

    if(instance){
        instance.visible = false;
        instance = null;
    }
};

['success'].forEach((method) => {
    Toast[method] = (content, time, useShade) => {
        Toast('<i class="vmui-toast-icon"></i>' + content, time, useShade, 'vmui-toast-' + method);
    };
});
</script>

<template>
<Shade v-if="useShade" :visible="visible">
    <Overlay :class="className" position="center" :visible="true" v-html="content"><div v-html="content"></div></Overlay>
</Shade>
<Overlay v-else :visible="visible" :class="className" position="center"><div v-html="content"></div></Overlay>
</template>