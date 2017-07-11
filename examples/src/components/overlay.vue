<template>
    <page>
        <topbar slot="header">overlay + mask组件</topbar>
        <p style="text-align: center;"><btn @click="show('left')" style="width: 80%; margin-top: 20px;">左</btn></p>
        <p style="text-align: center;"><btn @click="show('right')" style="width: 80%; margin-top: 20px;">右</btn></p>
        <p style="text-align: center;"><btn @click="show('top')" style="width: 80%; margin-top: 20px;">上</btn></p>
        <p style="text-align: center;"><btn @click="show('bottom')" style="width: 80%; margin-top: 20px;">下</btn></p>
        <p style="text-align: center;"><btn @click="show('center')" style="width: 80%; margin-top: 20px;">中间</btn></p>

        <vm-mask ref="mask" @click="hide()">
            <overlay position="left" style="width: 100px;" ref="left" @click="hide('left')">从左边出现</overlay>
            <overlay position="right" style="width: 100px;" ref="right" @click="hide('right')">从右边出现</overlay>
            <overlay position="top" style="height: 100px;" ref="top" @click="hide('top')">从上面出现</overlay>
            <overlay position="bottom" style="height: 100px;" ref="bottom" @click="hide('bottom')">从下面出现</overlay>
            <overlay position="center" style="width: 100px; padding: 30px; text-align: center;" ref="center" @click="hide('center')">淡入淡出</overlay>
        </vm-mask>
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
        Components,
    } from 'vm';

    export default{
        components: {
            Page, 
            Topbar,
            Btn,
            Overlay,
            vmMask: Mask
        },

        data(){
            return {
                position: ''
            };
        },

        methods: {
            show(position){
                this.$refs[this.position = position].open();
                this.$refs.mask.open();
            },

            hide(position = this.position){
                this.$refs[position].close();
                this.$refs.mask.close();
            }
        }
    }
</script>