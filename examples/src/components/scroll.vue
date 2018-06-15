<template>
    <page>
        <topbar slot="header">scroll组件</topbar>
            <scroll axis="x" :scrollbars="true" class="row" style="height: 200px;">
                <a v-for="(i, a) of 100">{{i}}</a>
            </scroll>


            <pulldown2refresh axis="y" class="col" style="margin-bottom: 30px;" ref='scroll' @refresh="onRefresh" id="scroll2">
                <a v-for="(i, a) of 50">scroll组件</a>
            </pulldown2refresh>


            <scroll slot="footer" axis="y" :scrollbars="true" class="col" style="margin-bottom: 30px; height: 100px;" id="scroll1" v-if="show">
                <a v-for="(i, a) of 7">scroll组件</a>
            </scroll>
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
        Pulldown2refresh,
        Autosize
    } from 'vm';

    export default{
        components: {
            Page, 
            Topbar,
            Scroll,
            Pulldown2refresh
        },

        data(){
            return {
                show: true
            };
        },

        mounted(){
            setTimeout(() => {
                this.show = false;
                Autosize.resize(this.$refs.scroll.$el);

                setTimeout(() => {
                    this.show = true;
                    Autosize.resize(this.$refs.scroll.$el)
                }, 2000);
            }, 1000);
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