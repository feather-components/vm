<template>
    <page position="right" :fx="fx" :visible="visibility" class="vm-search" ref="page">
        <topbar :left-enabled="false">
            <searchbar :placeholder="placeholder" :maxlength="maxlength" ref="search" :input-bg-color="inputBgColor"
                        :search-button-enabled="closeAfterSelectHistory" @submit="submit" v-model="val" />
            <a href="javascript:" class="vm-search-cancel" @touchend="cancel" slot="right">取消</a>
        </topbar>

        <div class="vm-search-inner">
            <div class="vm-search-header">
                <slot name="header"></slot>
            </div>

            <div class="vm-search-history-container" v-if="!empty2load && !val && historys.length">
                <div class="vm-search-history-header">
                    历史搜索
                    <a href="javascript:" @click="clearHistory()" class="vm-searcy-history-clear">清除</a>
                </div>
                <div class="vm-search-historys">
                    <a v-for="(item, index) of historys" class="vm-search-history" href="javascript:" @click="clickHistory(item, index)">
                        <slot name="history-row" :data="item">{{item.length > 20 ? item.substring(0, 20) + '..' : item}}</slot>
                    </a>
                </div>
            </div>

            <div class="vm-search-desc" v-if="!isEmpty">
                <slot name="desc" v-if="!isEmpty">搜索结果</slot>
            </div>

            <div class="vm-search-default" v-if="!empty2load && !value">
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
    .vm-search-cancel{
        float: right;
        width: .32rem;
        display: inline-block;
        text-decoration: none;
        color: inherit;
        font-size: 0.14rem;
        font-weight: normal;
    }

    .vm-search{
        font-weight: normal;

        .vm-list-rows{
            margin-bottom: .3rem;
        }

        .vm-searchbar-inner{
            margin: 0px;
        }

        .vm-searchbar{
            padding-top: 0px;
            padding-bottom: 0px;
            padding-right: 0.45rem;
            box-sizing: border-box;
            width: 100%;
        }
    }

    .vm-search-inner{
        margin: 0 .16rem;
        margin-top: .08rem;
    }

    .vm-search-desc, .vm-search-history-header{
        height: .28rem;
        line-height: .28rem;
    }

    .vm-search-history-container a{
        text-decoration: none;
        color: #333;
    }

    .vm-search-historys{
        margin: 0.08rem 0px;
    }

    .vm-search-history{
        background: #eee;
        margin-bottom: .08rem;
        margin-right: 0.08rem;
        height: .24rem;
        line-height: .24rem;
        display: inline-block;
        border-radius: 10px;
        padding: 0px .10rem;
    }

    .vm-searcy-history-clear{
        float: right;
        color: #6281C2;
    }
</style>

<script>
    import Page from '../page';
    import Topbar from '../topbar';
    import Searchbar from '../searchbar';
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
            var self = this;

            self.$search = self.$refs.search;
            self.$list = self.$refs.list;
            self.initEvents();

            self.autofocus && setTimeout(() => {
                self.$search.focus();
            }, 1000);
        },

        data(){
            var historys = [];

            try{
                historys = JSON.parse(localStorage.getItem('_vm_history_stores_.' + this.historyMark)) || [];
            }catch(e){};

            return {
                caches: {},
                isEmpty: true,
                historys: historys,
                timeout: "",
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
                    if(this.timeout){
                        clearTimeout(this.timeout)
                    }
                    this.timeout = setTimeout(()=>{
                        self.$list.refresh();
                    },400)
                    
                }
            },

            open(){
                var self = this;

                self.$refs.page.open();
                self.$emit('open');
                setTimeout(() => {
                    self.$refs.search.focus();
                }, 400);
            },

            close(){
                var self = this;

                self.$refs.page.close();
                self.$refs.search.blur();
                self.$emit('close');
            },

            submit(){
                var self = this;
                
                if(this.closeAfterSelectHistory){
                    self.cancel();
                    self.addHistory();
                    self.$emit('confirm', self.val);
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
                localStorage.setItem('_vm_history_stores_.' + this.historyMark, JSON.stringify(this.historys));
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