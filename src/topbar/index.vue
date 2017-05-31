<style lang="less">
@h: 0.44rem;

.vmui-topbar{
    background: #28304E;
    width: 100%;
    height: @h;
    line-height: @h;
    color: #fff;
    text-align: center;
    position: relative;
    font-size: 0.16rem;
}

.vmui-topbar-btn-back{
    background: url(./arrow_back_white@2x.png?__inline) no-repeat center center;
    width: @h;
    height: @h;
    display: inline-block;
}

.vmui-topbar-left, .vmui-topbar-right{
    position: absolute;
    bottom: 0px;
    height: @h;
    min-width: @h;
    display: inline-block;

    *{
        color: #fff;
        text-decoration: none;
    }
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
            <a href="javascript:" class="vmui-topbar-btn-back" @click="leftCallback && leftCallback()"></a>
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

        leftCallback: {
            type: Function,
            default(){
                history.back();
            }
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