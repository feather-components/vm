<template>
    <page>
        <vm-topbar slot="header">popup</vm-topbar>
        <p style="text-align: center;"><btn @click="show('left')" style="width: 80%; margin-top: 20px;">左</btn></p>
        <p style="text-align: center;"><btn @click="show('right')" style="width: 80%; margin-top: 20px;">右</btn></p>
        <p style="text-align: center;"><btn @click="show('top')" style="width: 80%; margin-top: 20px;">上</btn></p>
        <p style="text-align: center;"><btn @click="show('bottom')" style="width: 80%; margin-top: 20px;">下</btn></p>
        <p style="text-align: center;"><btn @click="show('center')" style="width: 80%; margin-top: 20px;">中间</btn></p>

        <vm-popup position="left" ref="left">
            <div style="width: 100px; background: #fff; height: 100%;">从左边出现</div>
        </vm-popup>

        <vm-popup position="right" ref="right">
            <div style="width: 100px; background: #fff; height: 100%;">从右边出现</div>
        </vm-popup>

        <vm-popup position="top" ref="top">
            <div style=" background: #fff;width: 100%;">从上面出现</div>
        </vm-popup>

        <vm-popup position="bottom" ref="bottom">
            <div style="background: #fff;width: 100%;">从下面出现</div>
        </vm-popup>

        <vm-popup position="center" ref="center">
            <div style="width: 100px; background: #fff; height: 100px; text-align: center;">在中间出现</div>
        </vm-popup>
    </page>
</template>

<script>
import {
    Page,
    Topbar,
    Alert,
    Button as Btn,
    Mask,
    Overlay,
    Components
} from 'vm';

export default {
    components: {
        Page,
        Topbar,
        Btn,
        Overlay,
        vmMask: Mask
    },

    data () {
        return {
            position: ''
        };
    },

    methods: {
        show (position) {
            this.$refs[this.position = position].show();
        }
    }
};
</script>