<style lang="less">
    @h: 0.44rem;

    .vm-topbar{
        background: #28304E;
        height: @h;
        line-height: @h;
        color: #fff;
        text-align: center;
        font-size: 0.16rem;
        padding: 0px 0.16rem;
    }

    .vm-topbar-inner{
        position: relative;
    }

    .vm-topbar-btn-back{
        background: url(./arrow_back_white@2x.png?__inline) no-repeat 0px center;
        width: @h !important;
        height: @h;
        display: inline-block;
    }

    .vm-topbar-left, .vm-topbar-right{
        position: absolute;
        bottom: 0px;
        height: @h;
        display: inline-block;

        > *{
            color: #fff;
            text-decoration: none;
            display: inline-block;
            width: 100%;
        }
    }

    .vm-topbar-right{
        right: 0px;
        text-align: right;
    }

    .vm-topbar-left{
        text-align: left;
        left: 0px;
    }
</style>

<template>
    <div class="vm-topbar" :style="{paddingTop: top}">
        <div class="vm-topbar-inner">
            <div class="vm-topbar-left" v-if="leftEnabled">
                <slot name="left">
                    <a href="javascript:" class="vm-topbar-btn-back" @click="leftCallback && leftCallback()"></a>
                </slot>
            </div>
            <slot>无标题页面</slot>
            <div class="vm-topbar-right" v-if="rightEnabled"><slot name="right"></slot></div>
        </div>
    </div>
</template>

<script>
    var TopBar = {
        name: 'topbar',

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

    export default TopBar;
</script>