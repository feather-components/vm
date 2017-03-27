<style>
.vmui-toast{
    font-size: 16px;
    color: #FFFFFF;
    line-height: 28px;
    padding: 8px 20px;
    max-width: 90%;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
}
</style>

<script>
import Vue from 'vue';
import Shade from './widgets/shade';
import Overlay from './widgets/overlay';

var instance = null, timeid;

var Toast = module.exports = (content, time, useShade, className) => {
    Toast.destroy();

    var element = document.createElement('div');
    document.body.appendChild(element);

    instance = new Vue({
        template: Toast.template,
        components: {
            Shade,
            Overlay
        },
        data: {
            content: content,
            useShade: useShade,
            visible: true
        }
    }).$mount(element).$children[0];

    if(time){
        timeid = setTimeout(Toast.destroy, time)
    }

    return instance;
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
</script>

<template>
<Shade v-if="useShade" :visible="visible">
    <Overlay class="vmui-toast" position="center" :visible="true">{{content}}</Overlay>
</Shade>
<Overlay v-else :visible="visible" class="vmui-toast" position="center">{{content}}</Overlay>
</template>