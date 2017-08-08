<template>
    <page>
        <topbar slot="header">slider组件</topbar>
        <slider @switch="slideTo">
            <slider-item style="height: 300px;">
                向右滑
            </slider-item>

            <slider-item>
                <list 
                    source="https://3g.163.com/touch/jsonp/sy/recommend/10-10.html?hasad=1&miss=59&refresh=A&offset=0&size=10&callback=?" 
                    :max-count-per-page="10" 
                    :data-formatter="formatter" 
                    :pullup2load="true"
                    :pulldown2refresh="true"
                    ref="list"
                    :auto-refresh="false"
                >   
                    <header slot="header">网易实时新闻</header>
                    <template slot="row" scope="props">
                        <div class="row">
                            <a class="inner" :href="props.data.link">
                                <template v-if="!props.data.title">
                                    <img class="ads" src="http://cms-bucket.nosdn.127.net/96d8cf0375f64c24a819d50ae190b51820170601175516.jpeg?imageView&thumbnail=690y230&quality=45&type=webp&interlace=1&enlarge=1" />
                                </template>
                                <template v-else>
                                    <img v-if="props.data.picInfo[0]" :src="props.data.picInfo[0].url"  />
                                    <span class="title">{{props.data.digest}}</span>
                                </template>
                            </a>
                        </div>
                    </template>
                </list>
            </slider-item>

            <slider-item style="height: 300px;">
                向左滑
            </slider-item>
        </slider>   
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
        Topbar,
        Slider,
        SliderItem
    } from 'vm';

    export default{
        components: {
            Page,
            Topbar,
            Slider,
            SliderItem,
            List
        },

        data(){
            return {
                isLoadedNews: false
            };
        },

        methods: {
            formatter(data){
                return data.list;
            },

            slideTo(from, to){
                if(to === 1){
                    this.$refs.list.refresh();
                    this.isLoadedNews = true;
                }
            }
        }
    }
</script>