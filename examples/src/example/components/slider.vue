<template>
    <page>
        <vm-topbar slot="header">swiper组件</vm-topbar>
        <swiper @switch="slideTo" axis="x">
            <swiper-item style="height: 100%;background:#ccc">
                向右滑
            </swiper-item>

            <swiper-item>
                <vm-list
                    :api="api"
                    :max-count-per-page="10"
                    :pullup2load="true"
                    :pulldown2refresh="true"
                    ref="list"
                >
                    <header slot="header">网易实时新闻</header>
                    <template v-slot:row="{data, index}">
                        <div class="row">
                            <a class="inner" href="javascript:">
                                <vm-swipeout>
                                    <div :class="{
                                    content: true,
                                    active: false
                                    }" >
                                        <template v-if="!data.title">
                                        <vm-image class="ads" src="http://cms-bucket.nosdn.127.net/96d8cf0375f64c24a819d50ae190b51820170601175516.jpeg?imageView&thumbnail=690y230&quality=45&type=webp&interlace=1&enlarge=1" />
                                        </template>
                                        <template v-else>
                                            <vm-image v-if="data.picInfo[0]" :src="data.picInfo[0].url"  />
                                            <span class="title">{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}</span>
                                        </template>
                                    </div>
                                </vm-swipeout>
                            </a>
                        </div>
                    </template>
                </vm-list>
            </swiper-item>

            <swiper-item style="background:#ddd">
                向左滑
            </swiper-item>
        </swiper>
    </page>
</template>

<style scoped>
    .row{
        padding: 0px 10px;
    }

    .inner{
        min-height: 0.7rem;
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
        font-size: 0.14rem;
    }

    img{
        width: .90rem;
        height: 0.7rem;
        display: block;
        float: left;
        margin-right: 0.1rem;
    }

    .ads{
        width: 100%;
        float: none;
        height: 1.15rem;
    }

    header{
        padding: 5px;
        text-align: center;
    }
</style>

<script>
import Vue from 'vue';
import {
    List,
    Page,
    TopBar,
    Swiper,
    SwiperItem
} from 'vm';

import Ajax from 'ajax';
export default {
    components: {
        Page,
        TopBar,
        Swiper,
        SwiperItem,
        List
    },

    data () {
        return {
            isLoadedNews: false
        };
    },

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

        slideTo (to, from) {
            if (to === 1) {
                this.$refs.list.refresh();
                this.isLoadedNews = true;
            }
        }
    }
};
</script>