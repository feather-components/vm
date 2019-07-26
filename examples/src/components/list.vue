<template>
    <page>
        <topbar slot="header">list组件</topbar>
            <list
                :api="api"
                :max-count-per-page="10"
                :data-formatter="formatter"
                :pullup2load="true"
                :pulldown2refresh="true"
                v-lazyload
            >
                <header slot="header">网易实时新闻</header>
                <template v-slot:row="{data, index}">
                    <div class="row">
                        <a class="inner" href="javascript:">
                            <vm-swipeout>
                                <div :class="{
                                content: true,
                                active: active
                                }" >
                                    <template v-if="!data.title">
                                    <img class="ads" data-src="http://cms-bucket.nosdn.127.net/96d8cf0375f64c24a819d50ae190b51820170601175516.jpeg?imageView&thumbnail=690y230&quality=45&type=webp&interlace=1&enlarge=1" />
                                    </template>
                                    <template v-else>
                                        <img v-if="data.picInfo[0]" :data-src="data.picInfo[0].url"  />
                                        <span class="title">{{data.digest}}</span>
                                    </template>
                                </div>

                                <template slot="actions">
                                    <vm-swipeout-action style="width: 100px; background: blue;" @click="onDel">删除</vm-swipeout-action>
                                    <vm-swipeout-action @click="onComment">评论</vm-swipeout-action>
                                </template>
                            </vm-swipeout>
                        </a>
                    </div>
                </template>
            </list>
    </page>
</template>

<style scoped>
    .row{
        padding: 0px 10px;
    }

    .inner{
        min-height: 70px;
        display: block;
        text-decoration: none;
        color: #000;
        position: relative;
    }

    .content{
        background: #fff;
        padding: 10px 0px;
        border-bottom: 1px solid #ccc;
    }

    .active{
        transition: transform .3s ease;
    }

    .comment{
        position: absolute;
        height: 100%;
        width: 100px;
        background: red;
        color: #fff;
        display: block;
        right: 1px;
        top: 1px;
        z-index: -1;
        text-align: center;
    }

    .content:after{
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden
    }

    .title{
        font-size: 14px;
    }

    img{
        width: 90px;
        height: 70px;
        display: block;
        float: left;
        margin-right: 10px;
    }

    .ads{
        width: 100%;
        float: none;
        height: 115px;
    }

    header{
        padding: 5px;
        text-align: center;
    }
</style>

<script>
import {
    Page,
    Topbar,
    List,
    Draggable,
    Lazyload
} from 'vm';
import Ajax from 'ajax';

export default {
    components: {
        Page,
        Topbar,
        List
    },

    data () {
        return {
            active: false
        };
    },

    directives: {Draggable, Lazyload},

    methods: {
        api (params) {
            return new Promise((resolve, reject) => {
                Ajax({
                    url: 'https://3g.163.com/touch/jsonp/sy/recommend/10-10.html?hasad=1&miss=59&refresh=A&offset=0&size=10&callback=?',
                    dataType: 'json',
                    success (data) {
                        resolve(data.list);
                    },
                    error: reject
                });
            });
        },

        formatter (data) {
            return data.list;
        },

        canDrag (info) {
            return info.x > -100 && info.x <= 0;
        },

        dragStart () {
            this.active = false;
        },

        dragEnd (event) {
            var info = event.data;
            this.active = true;
            setTimeout(() => {
                info.e.target.style.transform = `translate3d(${info.x < -50 ? -100 : 0}px, 0px, 0px)`;
            }, 100);
            
        },

        onDel () {
            console.log('del');
        },

        onComment () {
            console.log('comment')
        }
    }
};
</script>