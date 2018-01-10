<template>
    <page>
        <search kw="wd" 
            source="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&cb=?"
            history-mark="history"
            :data-formatter="formatter"
            :close-callback="cancel"
            :fx="false"
            :close-after-select-history="true"
            @select="select"
            @confirm="confirm"
        >
            <template scope="props" slot="row">
                <div class="row">{{props.data.q}}</div>
            </template>
        </search>
    </page>
</template>

<style scoped>
.row{
    font-size: 16px;
    padding: 10px 0px;
    border-bottom: 1px solid #eee;
}
</style>

<script>
    import {
        Page,
        Topbar,
        Search,
        Toast
    } from 'vm';

    export default{
        components: {
            Page, 
            Topbar,
            Search,
            Toast
        },

        methods: {
            formatter(data){
                return data.g || [];
            },

            cancel(){
                history.back();
            },

            select(v){
                Toast('select:' + JSON.stringify(v));
            },

            confirm(v){
                Toast('confirm:' + v);
            }
        }
    }
</script>