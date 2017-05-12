<style>
.vmui-toast{
    font-size: 0.16rem;
    color: #FFFFFF;
    line-height: 0.28rem;
    padding: 0.08rem 0.2rem;
    max-width: 90%;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    text-align: center;
}

.vmui-toast-icon{
    width: .36rem;
    height: .36rem;
    display: block;
    margin: .05rem auto 0.07rem auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
}

.vmui-toast-success .vmui-toast-icon{
    background-image: url(./success@3x.png?__inline);
}

.vmui-toast-loading .vmui-toast-icon{
    background-image: url(./loading.gif?__inline);
}
</style>

<script>
import Vue from 'vue';
import Shade from '../shade';
import Overlay from '../overlay';
import Factory from '../factory';

var instance = null, timeid;

var Toast = module.exports = (content, time = 3000, useShade, className = '') => {
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

['success', 'loading'].forEach((method) => {
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