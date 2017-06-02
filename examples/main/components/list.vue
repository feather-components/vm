<template>
    <page>
        <topbar>list组件</topbar>
            <list 
                source="https://3g.163.com/touch/jsonp/sy/recommend/10-10.html?hasad=1&miss=59&refresh=A&offset=0&size=10&callback=?" 
                :max-count-per-page="10" 
                :data-formatter="formatter" 
                :pullup2load="true"
                :pulldown2refresh="true"
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
    </page>
</template>

<style scoped>
.row{
    padding: 0px 10px;
}

.inner{
    padding: 10px 0px;
    border-bottom: 1px solid #ccc;
    min-height: 0.7rem;
    display: block;
    text-decoration: none;
    color: #000;
}

.inner:after{
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
    import {
        Page,
        Topbar,
        List
    } from 'vmui';

    export default{
        components: {
            Page, 
            Topbar,
            List
        },

        methods: {
            formatter(data){
                return data.list;
            }
        }
    }
</script>