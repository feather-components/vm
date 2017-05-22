<template>
<Page position="right" :fx="true" :visible="visibility" class="vmui-search" ref="page">
    <Topbar :leftEnabled="false">
        <search-bar :style="{
            'margin-right': '2.5em'
        }" :placeholder="placeholder" :maxlength="maxlength" ref="search" :theme="theme"
                    :is-search="closeAfterSelectHistory" @submit="handleSearch"/>
        <a href="javascript:" class="vmui-search-cancel" @touchstart="close()" slot="right">取消</a>
    </Topbar>

    <div class="vmui-search-inner">
        <div class="vmui-search-header">
            <slot name="header"></slot>
        </div>

        <div class="vmui-search-history-container" v-if="!empty2load && !value && historys.length">
            <div class="vmui-search-history-header">
                历史搜索
                <a href="javascript:" @click="clearHistory()" class="vmui-searcy-history-clear">清除</a>
            </div>
            <div class="vmui-search-historys">
                <a v-for="(item, index) of historys" class="vmui-search-history" href="javascript:" @click="clickHistory(item, index)">
                    <slot name="history-row" :data="item" v-text="item"></slot>
                </a>
            </div>
        </div>

        <div class="vmui-search-desc" v-if="!isEmpty">
            <slot name="desc" v-if="!isEmpty">附近小区</slot>
        </div>

        <div class="vmui-search-default" v-if="!empty2load && !value">
            <slot name="default"></slot>
        </div>

        <List ref="list" :source="source" :data-formatter="dataFormatter" :params="params"  :auto-refresh="false" :max-count-per-page="10">
            <template slot="row" scope="props">
                <slot name="row" :data="props.data"></slot>
            </template>

            <template slot="nores" v-if="$slots.nores">
                <slot name="nores"></slot>
            </template>
        </List>
    </div>
</Page>
</template>

<style>
.vmui-search-cancel{
    float: right;
    width: .32rem;
    margin: 0px .16rem;
    display: inline-block;
    text-decoration: none;
    color: #fff;
    font-size: 0.14rem;
}

.vmui-search{
    .vmui-list{
        li{
            border-bottom: 1px solid #E1E1E1;
        }
    }

    .vmui-list-rows{
        margin-bottom: .3rem;
    }
}

.vmui-search-inner{
    margin: 0 .16rem;
    margin-top: .08rem;
}

.vmui-search-desc, .vmui-search-history-header{
    height: .28rem;
    line-height: .28rem;
}

.vmui-search-historys{
    margin: 0.08rem 0px;
}

.vmui-search-history{
    background: #eee;
    margin-bottom: .08rem;
    margin-right: 0.08rem;
    height: .24rem;
    line-height: .24rem;
    display: inline-block;
    border-radius: 10px;
    padding: 0px .10rem;
    box-sizing: border-box;
    max-width: 100%;
}

.vmui-searcy-history-clear{
    float: right;
    color: #6281C2;
}
</style>

<script>
import Page from '../page';
import Topbar from '../topbar';
import SearchBar from './bar';
import List from '../list';

export default{
    mixins: [Page, SearchBar],

    components: {
        Page,
        Topbar,
        SearchBar,
        List
    },

    props: {
        theme: {
            type: String,
            default: 'white'
        },

        source: {
            default(){
                return [];
            }
        },

        useHistory: {
            type: Boolean,
            default: true
        },

        dataFormatter: null,

        params: null,

        autofocus: {
            type: Boolean,
            default: true
        },

        delay: {
            type: Number,
            default: 300
        },

        caching: {
            type: Boolean,
            default: true
        },

        empty2load: {
            type: Boolean,
            default: false
        },

        kw: {
            type: String,
            default: 'kw'
        },

        historyMark:{
            type: String,
            require: true,
            default: null
        },

        closeAfterSelectHistory: {
            type: Boolean,
            default: false
        }
    },

    mounted(){
        this.$search = this.$refs.search;
        this.$list = this.$refs.list;
        this.initEvents();

        this.autofocus && setTimeout(() => {
            this.$search.focus();
        }, 1000);

    },

    data(){
        return {
            caches: {},
            value: '',
            isEmpty: true,
            historys: JSON.parse(localStorage.getItem('_vmui_history_stores_')) || {}
        };
    },

    methods: {
        initEvents(){
            var self = this, tid;

            self.$search.$on('input', function(value){
                clearTimeout(tid);
                self.$list.abort();
                self.value = value;
                tid = setTimeout(() => self.load(), self.delay);
            });

            self.$list.$on('row:click', (item, index) => {
                self.$emit('select', item, index);

                self.setHistory()

            });

            self.$list.$on('xhr.success', (data) => {
                self.caches[self.value] = data;
            });

            self.$list.$on('rows:render', (data) => {
                self.isEmpty = !!!data.length;
            });
        },

        clickHistory(it, i) {
            if(!this.closeAfterHistoryClick){
                this.$refs.search.value = it;
            }else{
                this.setHistory()
                this.handleSearch()
            }
        },

        load(){
            var self = this;

            if(!self.empty2load && !self.value){
                return;
            }

            if(self.caches[self.value]){
                self.$list.setData(self.caches[self.value]);
            }else{
                let param = {}
                param[self.kw] =  self.value
                self.$list.setParams(param, true);
                self.$list.refresh(false, false);
            }
        },

        open(){
            this.$refs.page.open();
            this.$emit('open');
            setTimeout(() => {
                this.$refs.search.focus();
            }, 400);
        },

        close(){
            this.$refs.page.close();
            this.$refs.search.blur();
            this.$emit('close');
        },

        clickHistory(text) {
            if(this.closeAfterSelectHistory){
                this.$refs.search.value = this.value = text;
                this.handleSearch()
            }
        },

        setHistory(){
            let self = this;
            if(self.historys.indexOf(self.value) == -1 && self.value!=''){
                self.historys.unshift(self.value);
                self.historys = self.historys.slice(0,10);
                self.historysAll[self.historyMark] = self.historys
                localStorage.setItem('_vmui_history_stores_', JSON.stringify(self.historysAll));
            }
        },

        handleSearch() {
            this.close()
            this.setHistory()
            this.$emit('confirm', this.value.trim())
        }
    }
}
</script>