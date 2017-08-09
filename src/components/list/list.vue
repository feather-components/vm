<template>
    <scroll 
        ref="scroll" 
        :scrollbars="true"
        class="vm-list"
        @drag:limit="onDragLimit"
        @drag:normal="onDragNormal"
        @scroll:limit="onScrollLimit"
    >
        <div class="vm-list-pull" v-if="pulldown2refresh" ref="pd" slot="pulldown">
            <slot name="pulldown-msg" v-if="!isRefreshing && !intop">下拉刷新数据</slot>
            <slot name="pullleave-msg" v-if="!isRefreshing && intop">松手刷新数据</slot>
            <slot name="refresh-msg" v-if="isRefreshing"><i class="vm-list-loading-icon"></i>正在刷新数据</slot>
        </div>

        <div class="vm-list-header">
            <slot name="header"></slot>
        </div>

        <ul class="vm-list-rows" ref="rows">
            <li v-for="(item, index) in rows" @click="$emit('row:click', item, index)" class="vm-list-item">
                <slot name="row" :data="item">{{item}}</slot>
            </li>
        </ul>

        <div class="vm-list-loading" v-if="showLoadingStatus">
            <slot name="loading"><i class="vm-list-loading-icon"></i>正在加载中</slot>
        </div>

        <template v-if="showMsg">
            <div class="vm-list-error" v-if="showErrorStatus">
                <slot name="error">网络异常，加载失败</slot>
            </div>

            <div class="vm-list-nomore" v-if="showNoMoreStatus" ref="nomore">
                <slot name="nomore">~没有更多了~</slot>
            </div>

            <div class="vm-list-empty" v-if="showEmptyStatus">
                <slot name="nores"><i class="vm-list-nores-icon"></i><br />没有任何结果~</slot>
            </div>
        </template>
    </scroll>
</template>

<style>
    .vm-list{
        font-size: 0.16rem;
    }

    .vm-list-pull, .vm-list-loading, .vm-list-error, .vm-list-nomore, .vm-list-empty{
        text-align: center;
        padding: 0.05rem;
        color: #878787;
        width: 100%;
        font-size: 0.12rem;
    }

    .vm-list-loading-icon{
        display: inline-block;
        width: 0.16rem;
        height: 0.16rem;
        background-image: url(./loading.gif?__inline);
        background-size: 100%;
        margin-right: 0.05rem;
        transform: translateY(0.03rem);
        -webkit-transform: translateY(0.03rem);
    }

    .vm-list-rows{
        padding: 0px;
        margin: 0px;
        list-style: none;

        *{
            margin: 0px;
            padding: 0px;
        }
    }

    .vm-list-nores{
        margin-top: 0.2rem;
    }

    .vm-list-nores-icon{
        background: url(./empty.png?__inline);
        width: 1.3rem;
        height: 1.3rem;
        display: inline-block;
        margin-bottom: 0.1rem;
        background-size: 100%;
    }
</style>

<script>
    import Scroll from '../scroll';
    import {Dom, Util} from '../../helper';
    import Ajax from 'ajax';

    export default{
        name: 'list',

        props: {
            autoRefresh: {
                type: Boolean,
                default: true
            },

            source: {
                default(){
                    return [];
                }
            },

            dataFormatter: {
                type: Function,
                default(data = []){
                    return data;
                }
            },

            maxCountPerPage: {
                type: Number,
                default(){
                    return 20;
                }
            },

            params: {
                type: Object,
                default(){
                    return {};
                }
            },

            pulldown2refresh: {
                type: Boolean,
                default(){
                    return false;
                }
            },

            pullup2load: {
                type: Boolean,
                default(){
                    return false;
                }
            },

            showMsg: {
                type: Boolean,
                default: true
            }
        },

        data(){
            return {
                data: [],
                rows: [],
                _params: this.params,
                isLoading: false,
                isRefreshing: false,
                isCompleted: false,
                page: 0,
                error: 0,
                scrolling: false,
                $scroll: null,
                intop: false,
                _source: ''
            }
        },

        computed: {
            showLoadingStatus(){
                return !this.isCompleted && this.pullup2load && !this.error && this.page >= 1;
            },

            showErrorStatus(){
                return this.error && !this.isLoading;
            },

            showNoMoreStatus(){
                return this.page >= 1 && this.rows.length && this.isCompleted;
            },

            showEmptyStatus(){
                return !this.rows.length && this.isCompleted;
            }
        },

        components: {
            Scroll
        },

        mounted(){
            var self = this;

            self._params = self.params;
            self.setSource(self.source);    
            self.$nextTick(() => self.init());
        },

        watch: {
            source(v){
                var self = this;

                self.setSource(v);
                self.autoRefresh && self.refresh(self.pulldown2refresh, false);
            },

            params(v){
                var self = this;

                self.setParams(v);
                self.autoRefresh && self.refresh(self.pulldown2refresh, false);
            }
        },

        methods: {
            init(){
                var self = this;

                self.$scroll = self.$refs.scroll;
                self.autoRefresh && self.refresh(self.pulldown2refresh, false);
            },

            onScrollLimit(translate, direction){
                var self = this;

                if(self.pulldown2refresh && direction == 1){
                    self.refresh(true);
                }

                self.pullup2load && direction == -1 && self.load();
            },

            onDragLimit(translate, direction){
                this.intop = direction == 1;
                direction == -1 && this.onScrollLimit(translate, -1);
            },

            onDragNormal(translate){
                this.intop = false;
            },

            setParams(params, append){
                if(append){
                    this._params = Util.assign(this._params, params);
                }else{
                    this._params = params;
                }
            },

            setSource(source = ''){
                if(typeof source != 'string'){
                    this.setData(source);
                }else{
                    this._source = source;
                }
            },

            setData(data = []){
                this.data = [];
                this.addData(data);
            },

            addData(source){
                try{
                    source = this.dataFormatter(source);
                }catch(e){}

                this.data = this.data.concat(source || []);
                this.$emit('data:add', source);
            },

            refresh(pulldownFx = this.pulldown2refresh, clearData = true){
                var self = this;
                
                self.page = 0;
                self.isCompleted = false;
                self.isLoading = false;
                clearData && self.setData();
                self.isRefreshing = true;
                self.$emit('refresh');
                setTimeout(() => {
                    pulldownFx && self.$scroll.scrollTo(Dom.height(self.$refs.pd));
                    self.load();
                }, 0);
            },

            load(){
                var self = this;

                self.error = null; 

                if(self.isCompleted){
                    return false;
                }

                if(self.isLoading){
                    return false;
                }

                self.isLoading = true;

                if(self._source 
                    && typeof self._source == 'string' 
                    && (
                        self.rows.length == self.data.length 
                        || self.isRefreshing && !self.data.length
                        )
                    ){
                    self.loadRemote();
                }else{
                    self.renderRows();
                    self.isLoading = false;
                }
            },

            loadRemote(){
                var self = this;

                self.abort();
                self.$http = Ajax({
                    url: self._source,
                    data: Object.assign({}, self._params || {}, {
                        page: self.page + 1,
                        count: self.maxCountPerPage
                    }),
                    dataType: 'json',
                    success(data){
                        self.isRefreshing ? self.setData(data) : self.addData(data);  
                        self.renderRows();
                        self.$emit('xhr:success', data);
                    },
                    error(data){
                        self.error = data;
                        self.$emit('xhr:error');
                        self.afterRenderRows();
                    },
                    complete(){
                        self.$http = null;
                    }
                });
            },

            abort(){
                return this.$http && this.$http.abort();
            },

            renderRows(){
                var self = this;
                var page = ++self.page;

                var rows = self.data.slice(self.maxCountPerPage * (page - 1), self.maxCountPerPage * page);

                if(!self.pullup2load || rows.length < self.maxCountPerPage){
                    self.isCompleted = true;
                    self.$emit('nomore');
                }

                if(self.isRefreshing){
                    self.rows = rows;
                }else{
                    self.rows = self.rows.concat(rows);
                }

                self.$nextTick(() => {
                    self.$emit('rows:render', rows);
                });

                self.isRefreshing && self.$emit('refresh:success', rows);
                self.afterRenderRows();
            },

            afterRenderRows(){
                var self = this;

                self.isRefreshing && self.pulldown2refresh && this.$scroll.scrollTo(0, 500);
                self.isLoading = false;
                self.isRefreshing = false;
            }
        }
    }
</script>