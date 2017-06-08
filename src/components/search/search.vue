<template>
    <page position="right" :fx="fx" :visible="visibility" class="vmui-search" ref="page">
        <topbar :left-enabled="false">
            <searchbar :style="{
                'margin-right': '2.5em'
            }" :placeholder="placeholder" :maxlength="maxlength" ref="search" :theme="theme"
                        :search-button-enabled="closeAfterSelectHistory" @submit="submit" v-model="val" />
            <a href="javascript:" class="vmui-search-cancel" @touchstart="cancel" slot="right">取消</a>
        </topbar>

        <div class="vmui-search-inner">
            <div class="vmui-search-header">
                <slot name="header"></slot>
            </div>

            <div class="vmui-search-history-container" v-if="!empty2load && !val && historys.length">
                <div class="vmui-search-history-header">
                    历史搜索
                    <a href="javascript:" @click="clearHistory()" class="vmui-searcy-history-clear">清除</a>
                </div>
                <div class="vmui-search-historys">
                    <a v-for="(item, index) of historys" class="vmui-search-history" href="javascript:" @click="clickHistory(item, index)">
                        <slot name="history-row" :data="item">{{item}}</slot>
                    </a>
                </div>
            </div>

            <div class="vmui-search-desc" v-if="!isEmpty">
                <slot name="desc" v-if="!isEmpty">搜索结果</slot>
            </div>

            <div class="vmui-search-default" v-if="!empty2load && !value">
                <slot name="default"></slot>
            </div>

            <list ref="list" :source="source" :data-formatter="dataFormatter" :params="params"  :auto-refresh="false">
                <template slot="row" scope="props">
                    <slot name="row" :data="props.data">{{props.data}}</slot>
                </template>

                <template slot="nores" v-if="$slots.nores">
                    <slot name="nores"></slot>
                </template>
            </list>
        </div>
    </page>
</template>

<style lang="less">
    .vmui-search-cancel{
        float: right;
        width: .32rem;
        margin-right: 0.08rem;
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

    .vmui-search-history-container a{
        text-decoration: none;
        color: #333;
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
    }

    .vmui-searcy-history-clear{
        float: right;
        color: #6281C2;
    }
</style>

<script>
    import Page from '../page';
    import Topbar from '../topbar';
    import Searchbar from './bar';
    import List from '../list';

    export default {
        name: 'search',

        mixins: [Page, Searchbar],

        components: {
            Page,
            Topbar,
            Searchbar,
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
                default: true
            },

            closeCallback: {
                type: Function,
                default(){
                    this.close()
                }
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
            var historys = [];

            try{
                historys = JSON.parse(localStorage.getItem('_vmui_history_stores_.' + this.historyMark)) || [];
            }catch(e){};

            return {
                caches: {},
                isEmpty: true,
                historys: historys
            };
        },

        methods: {
            initEvents(){
                var self = this, tid;

                self.$search.$on('input', function(){
                    clearTimeout(tid);
                    self.$list.abort();
                    tid = setTimeout(() => self.load(), self.delay);              
                });

                self.$list.$on('row:click', (item, index) => {
                    self.$emit('select', item, index);
                    self.addHistory();
                });

                self.$list.$on('xhr:success', (data) => {
                    self.caches[self.value] = data;
                });

                self.$list.$on('rows:render', (data) => {
                    self.isEmpty = !!!data.length;
                });
            },

            load(){
                var self = this;

                if(!self.empty2load && !self.val){
                    return;
                }

                if(self.caches[self.val]){
                    self.$list.setData(self.caches[self.val]);
                }else{
                    let param = {};
                    param[self.kw] =  self.val;
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

            submit(){
                if(this.closeAfterSelectHistory){
                    this.cancel();
                    this.addHistory();
                    this.$emit('confirm', this.val);
                }
            },

            clickHistory(text){
                this.val = text;
                this.submit();
            },

            clearHistory(){
                this.historys = [];
                this.storeHistory();
            },

            storeHistory(){
                localStorage.setItem('_vmui_history_stores_.' + this.historyMark, JSON.stringify(this.historys));
            },

            addHistory(val = this.val){
                var self = this;

                if(val && self.historys.indexOf(val) == -1){
                    self.historys.unshift(val);
                    self.historys = self.historys.slice(0, 10);
                    self.storeHistory();
                }
            },

            cancel(){
                this.closeCallback();
            }
        }
    }
</script>