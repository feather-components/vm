<template>
    <page>
        <topbar slot="header">scroll组件</topbar>
            <scroll axis="x" :scrollbars="true" class="row">
                <a v-for="(i, a) of 100">{{i}}</a>
            </scroll>

            <scroll axis="y" :scrollbars="true" class="col" style="margin-bottom: 30px;">
                <a v-for="(i, a) of 7">scroll组件</a>
            </scroll>

            <pulldown2refresh axis="y" class="col" style="margin-bottom: 30px;" ref='scroll' @refresh="onRefresh">
                <a v-for="(i, a) of 50">scroll组件</a>
            </pulldown2refresh>
    </page>
</template>

<style scoped>
    .col a{
        display: block;
        font-size: 0.2rem;
        padding: .1rem .2rem;
    }

    .row a{
        font-size: 0.2rem;
        padding: .2rem;
        display: inline-block;
    }
</style>

<script>
    import {
        Page,
        Topbar,
        Scroll,
        Pulldown2refresh
    } from 'vm';

    export default{
        components: {
            Page, 
            Topbar,
            Scroll,
            Pulldown2refresh
        },

        methods: {
            _scrollStop() {
//                this.$refs.scroll.scrollTo(-100)
            },

            onRefresh(recover){
                setTimeout(() => {
                    recover();
                }, 1000)
            }
        }
    }
</script>