<style lang="less">
    @h: 0.44rem;

    .vm-topbar{
        height: @h;
        line-height: @h;
        text-align: center;
        font-size: 0.16rem;
        padding: 0px 0.16rem;
    }

    .vm-topbar-inner{
        position: relative;
    }

    .vm-topbar-btn-back{
        width: @h !important;
        height: @h;
        display: inline-block;

        .vm-iconfont{
            font-weight: bold;
            display: inline-block;
            transform: rotate(90deg);
        }
    }

    .vm-topbar-left, .vm-topbar-right{
        position: absolute;
        bottom: 0px;
        height: @h;
        display: inline-block;

        > *{
            text-decoration: none;
            display: inline-block;
            width: 100%;
            color: inherit;
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
    <div class="vm-topbar" :style="{paddingTop: top, background: bgColor, color: color, borderBottom: borderBottom}">
        <div class="vm-topbar-inner">
            <div class="vm-topbar-left" v-if="leftEnabled">
                <slot name="left">
                    <a href="javascript:" class="vm-topbar-btn-back" @click="leftCallback && leftCallback()" :style="{
                        color: color
                    }">
                        <icon name="arrow" :size=".18" />
                    </a>
                </slot>
            </div>
            <slot>无标题页面</slot>
            <div class="vm-topbar-right" v-if="rightEnabled"><slot name="right"></slot></div>
        </div>
    </div>
</template>

<script>
    import Icon from '../icon';

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
            },

            bgColor: {
                type: String,
                default(){
                    return TopBar.bgColor;
                }
            },

            color: {
                type: String,
                default(){
                    return TopBar.color;
                }
            },

            borderBottom: {
                type: String,
                default(){
                    return TopBar.borderBottom;
                }
            }
        },

        components: {
            Icon
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
    TopBar.bgColor = '#28304E';
    TopBar.color = '#fff';
    TopBar.borderBottom = '';

    export default TopBar;
</script>