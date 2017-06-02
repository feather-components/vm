<template>
    <page>
        <topbar>list组件</topbar>
            <list 
                source="http://s.weibo.com/ajax/jsonp/gettopsug?_cb=?" 
                :max-count-per-page="10" 
                :data-formatter="formatter" 
                :pullup2load="true"
                :pulldown2refresh="true"
            >   
                <header slot="header">微博实时数据</header>
                <template slot="row" scope="props">
                    <div class="row">
                        <div class="inner">{{props.data.word}}</div>
                    </div>
                </template>
            </list>
    </page>
</template>

<style scoped>
.row{
    padding: 5px;
}

.inner{
    background: #eee;
    padding: 10px;
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
                return data.data.list;
            }
        }
    }
</script>