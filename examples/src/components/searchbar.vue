<template>
    <page>
        <topbar slot="header">searchbar + list组件</topbar>
        <searchbar v-model="wd" placeholder="请输入关键词，百度搜索"></searchbar>
        <list
            source="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&cb=?"
            :params="{'wd': wd}"
            :auto-refresh="true"
            :data-formatter="formatter"

        >   
            <template slot="row" scope="props">
                <div class="row">
                    <a :href="'https://www.baidu.com/s?f=8&rsv_bp=1&rsv_idx=1&word=' + props.data.q + '&tn=97925205_hao_pg'" class="inner">
                        {{props.data.q}}
                    </a>
                </div>
                
            </template>
        </list>
    </page>
</template>

<style scoped>
.row{
    font-size: 16px;
    padding: 10px 10px 0px 10px;
}

.inner{
    height: 35px;
    line-height: 35px;
    background: #eee;
    display: block;
    text-decoration: none;
    color: #333;
    padding-left: 10px;
}
</style>

<script>
    import {
        Page,
        Topbar,
        Searchbar,
        Search,
        List
    } from 'vm';

    export default{
        components: {
            Page, 
            Topbar,
            Searchbar,
            Search,
            List
        },

        data(){
            return {
                wd: ''
            };
        },

        methods: {
            formatter(data){
                return data.g || [];
            }
        }
    }
</script>