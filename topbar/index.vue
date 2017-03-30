<style>
.vmui-topbar{
    background: #28304E;
    width: 100%;
    height: 45px;
    line-height: 45px;
    color: #fff;
    text-align: center;
}

.vmui-topbar-btn-back{
    background: url(./arrow_back_white@2x.png?__inline) no-repeat center center;
    width: 45px;
    height: 45px;
    display: inline-block;
    float: left;
}

.vmui-topbar-left, .vmui-topbar-right{
    position: absolute;
    bottom: 0px;
    height: 45px;
    min-width: 45px;
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
    <div class="vmui-topbar-left">
        <slot name="left">
            <a href="javascript:" class="vmui-topbar-btn-back" @touchstart="back()"></a>
        </slot>
    </div>
    <slot>无标题页面</slot>
    <div class="vmui-topbar-right" v-if="visibleRight"><slot name="right"></slot></div>
</div>
</template>

<script>
var TopBar = module.exports = {
    props: {
        rightVisible: {
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
        rightVisible(v){
            v ? this.showRight() : this.hideRight();
        }
    },

    mounted(){
        this.rightVisible && this.showRight();
    },

    methods: {
        back(){
            history.back();
        },

        hideRight(){
            this.visibleRight = false;
        },

        showRight(){
            this.visibleRight = true;
        }
    }
}

TopBar.topFixed = '0px';
</script>