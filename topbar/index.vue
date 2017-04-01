<style>
@h: 45/16em;

.vmui-topbar{
    background: #28304E;
    width: 100%;
    height: @h;
    line-height: @h;
    color: #fff;
    text-align: center;
    position: relative;
}

.vmui-topbar-btn-back{
    background: url(./arrow_back_white@2x.png?__inline) no-repeat center center;
    width: @h;
    height: @h;
    display: inline-block;
    position: absolute;
    left: 0px;
    bottom: 0px;
}

.vmui-topbar-left, .vmui-topbar-right{
    position: absolute;
    bottom: 0px;
    right: 0px;
    height: @h;
    min-width: @h;
    display: inline-block;
}

.vmui-topbar-right{
    right: 0px;
}

.vmui-topbar-left{
    left: 0px;
}
</style>

<template>
<div class="vmui-topbar" :style="{paddingTop: top}">
    <div class="vmui-topbar-left" v-if="leftEnabled">
        <slot name="left">
            <a href="javascript:" class="vmui-topbar-btn-back" @touchstart="back()"></a>
        </slot>
    </div>
    <slot>无标题页面</slot>
    <div class="vmui-topbar-right" v-if="rightEnabled"><slot name="right"></slot></div>
</div>
</template>

<script>
var TopBar = module.exports = {
    props: {
        leftEnabled: {
            type: Boolean,
            default: true
        },

        rightEnabled: {
            type: Boolean,
            default: true
        }
    },

    data(){
        return {
            top: TopBar.topFixed,
            visibleRight: false
        }
    },

    watch: {
        rightEnabled(v){
            v ? this.enableRight() : this.disableRight();
        }
    },

    mounted(){
        this.rightVisible && this.enableRight();
    },

    methods: {
        back(){
            history.back();
        },

        disableRight(){
            this.visibleRight = false;
        },

        enableRight(){
            this.visibleRight = true;
        }
    }
}

TopBar.topFixed = '0px';
</script>