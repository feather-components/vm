<template>
    <page>
        <vm-topbar slot="header">scroll组件</vm-topbar>
            <scroll scrollbars class="col" style="height: 300px;" ref="outerScroller" @scrolling="onScroll" :disabled="outerDisabled">
                <scroll axis="x" :scrollbars="true" class="row" style="height: 50px;">
                    <a v-for="(i, a) of 100">{{i}}</a>
                </scroll>

                <div ref="header">
                    <a v-for="(i, a) of 10">fjdkfd</a>
                </div>
                <scroll scrollbars class="col" style="height: 300px;" ref="innerScroller" :disabled="innerDisabled" @scrolling="onInnerScroll">
                    <a v-for="(i, a) of 100">{{i}}</a>
                </scroll>
            </scroll>

            <pulldown2refresh axis="y" class="col" style="margin-bottom: 30px;" ref='scroll' @refresh="onRefresh" id="scroll2">
                <a v-for="(i, a) of 50">scroll组件</a>
            </pulldown2refresh>
    </page>
</template>

<style scoped>
    .col a {
        display: block;
        font-size: 14px;
        padding: 10px;
    }

    .row a {
        font-size: 14px;
        padding: 10px;
        display: inline-block;
    }

    .g {
        display: inline-block;
        width: 10px;
        height: 5px;
        background: red;
        line-height: 0;
        font-size: 0;
        vertical-align: middle;
        -webkit-transform: rotate(45deg);
    }

    .g:after {
        content:'/';
        display:block;
        width: 20px;
        height:5px;
        background: red;
        -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
    }
</style>

<script>
import {
    Page,
    Topbar,
    Scroll,
    Pulldown2refresh,
    Autosize
} from 'vm';

export default {
    components: {
        Page,
        Topbar,
        Scroll,
        Pulldown2refresh
    },

    data () {
        return {
            show: true,
            innerDisabled: true,
            outerDisabled: false
        };
    },

    watch: {
        innerDisabled (v) {
            if (!v) {
                this.outerDisabled = true;
            } else {
                this.outerDisabled = false;
            }
        } 
    },

    methods: {
        _scrollStop () {
            //                this.$refs.scroll.scrollTo(-100)
        },

        onScroll (pos) {
            if (pos <= -this.$refs.header.clientHeight - 50) {
                if (this.innerDisabled) {
                    this.innerDisabled = false;
                    this.$refs.outerScroller.scrollTo(-this.$refs.header.clientHeight - 50);
                }
            } else {
                this.innerDisabled = true;
            }

        //    this.innerDisabled = pos > -this.$refs.header.clientHeight;
        },

        onInnerScroll (pos) {
            if (pos >= 0) {
                this.innerDisabled = true;
            }
        },

        onRefresh (recover) {
            setTimeout(() => {
                recover();
            }, 1000);
        }
    }
};
</script>