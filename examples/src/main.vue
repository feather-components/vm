<template>
    <page>
        <topbar :left-enabled="false">vm</topbar>

        <vm-scroll class="navs" >
            <a href="javascript:" v-for="item of source" @click="go(item)">{{item}}</a>
        </vm-scroll>
    </page>
</template>

<style scoped lang="less">
    header{
        padding: 0px 10px;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        border-bottom: 1px solid #ccc;
    }

    .main{
        display: flex;
        flex: 1;
    }

    .navs{
        a{
            height: 40px;
            line-height: 40px;
            padding: 0px 10px;
            display: block;
            text-decoration: none;
            color: #333;
            border-bottom: 1px solid #eee;
        }
    }
</style>

<script>
    import {
        List,
        Page,
        Topbar
    } from 'vm';

    export default{
        components: {
            List,
            Page,
            Topbar
        },

        data(){
            return {
                source: [
                    'components/layout',
                    'components/button',
                    'components/segment',
                    'components/forward',
                    'components/overlay',
                    'components/alert',
                    'components/toast',
                    'components/scroll',
                    'components/list',
                    'components/actionsheet',
                    'components/dropdown',
                    'components/search',
                    'components/searchbar',
                    'components/uploader',
                    'components/popover',
                    'components/form',
                    'components/filter',
                    'components/slider',
                    'components/tabbar',
                    'directives/badge',
                    'directives/lazyload',
                    'directives/draggable'
                ]
            }
        },

        methods: {
            go(url){
                this.$router.push(url);
            }
        }
    }                    
</script>