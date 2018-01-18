<style lang="less">
    @h: 0.44rem;

    .vm-topbar{
        height: @h;
        line-height: @h;
        text-align: center;
        font-size: 0.16rem;
        padding: 0px 0.12rem;
    }

    .vm-topbar-inner{
        position: relative;
        font-weight: bold;
        height: @h;
    }

    .vm-topbar-btn-back{
        width: @h !important;
        height: @h;
        display: inline-block;
    }

    .vm-topbar-title{
        align-items: center;
        height: @h;
        width: 100%;
        display: flex;
        justify-content: center;
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
                        <icon name="left" :size=".16" />
                    </a>
                </slot>
            </div>
            <div class="vm-topbar-title">
                <slot>无标题页面</slot>
            </div>
            <div class="vm-topbar-right" v-if="rightEnabled"><slot name="right"></slot></div>
        </div>
    </div>
</template>

<script>
    import Icon from '../icon';
    import {Util} from '../../helper';

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
                    return TopBar.config('bgColor');
                }
            },

            color: {
                type: String,
                default(){
                    return TopBar.config('color');
                }
            },

            borderBottom: {
                type: String,
                default(){
                    return TopBar.config('borderBottom');
                }
            }
        },

        components: {
            Icon
        },

        data(){
            return {
                top: TopBar.topFixed || TopBar.config('topFixed'),
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

    TopBar.topFixed = '';

    Util.defineConfig(TopBar, {
        topFixed: '0px',
        bgColor: '#28304E',
        color: '#fff',
        borderBottom: ''
    });

    export default TopBar;
</script>