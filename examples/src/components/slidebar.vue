<template>
    <page>
        <topbar slot="header">slidebar组件</topbar>
        <slide-bar  class="banner" v-cloak>
            <item-bar class="item">
                <div style="height: 100%;background: red;color:#fff;font-size: 0.3rem;">
                    11111111111111
                </div>
            </item-bar>
            <item-bar class="item">
                <div style="height: 100%;background: green;color:#fff;font-size: 0.3rem;">
                    2222222222222
                </div>
            </item-bar>
            <item-bar class="item">
                <div style="height: 100%;background: yellow;color:#fff;font-size: 0.3rem;">
                    3333333333333
                </div>
            </item-bar>
            <item-bar class="item">
                <div style="height: 100%;background: blue;color:#fff;font-size: 0.3rem;">
                    44444444444444
                </div>
            </item-bar>
        </slide-bar>   
    </page>
</template>

<style scoped>
    .banner{
        height:300px;
        /*width: 300px;*/
        width: 300px;
        margin: 0 auto;
        margin-top:50px;
    }
</style>    

<script>
    import Vue from 'vue';
    import {SlideBar,ItemBar} from 'common:vm';
    import {
        List,
        Page,
        Topbar,
        SlideBar,
        ItemBar
    } from 'vm';

    export default{
        components: {
            Page,
            Topbar,
            SlideBar,
            ItemBar,
            List
        },

        data(){
            
        },

        methods: {
            
        }
    }
</script>