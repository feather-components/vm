<template>
    <component ref="scroll" class="vm-list" @scrolling="onScrolling" :is="Component" @refresh="refresh">
        <div class="vm-list-header">
            <slot name="header"></slot>
        </div>

        <div ref="headerMark"></div>

        <slot name="rows" :data="rows">
            <ul class="vm-list-rows" ref="rows">
                <li v-for="(item, index) in rows" @click="$emit('row:click', item, index)" class="vm-list-item">
                    <slot name="row" :data="item">{{item}}</slot>
                </li>
            </ul>
        </slot>

        <div ref="footerMark"></div>

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
    </component>
</template>

<style>
    .vm-list{
        font-size: 0.16rem;
    }

    .vm-list-loading, .vm-list-error, .vm-list-nomore, .vm-list-empty{
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
        background-image: url(../../assets/loading.gif?__inline);
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
    import {Pulldown2refresh, Scroll} from '../scroll';
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
                Component: !this.pulldown2refresh ? Scroll : Pulldown2refresh,
                data: [],
                rows: [],
                _params: this.params,
                isLoading: false,
                isCompleted: false,
                page: 0,
                error: 0,
                $scroll: null,
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
                self.autoRefresh && self.refresh();
            },

            params: {
                deep: true,
                handler(v){
                    var self = this;

                    self.setParams(v);
                    self.autoRefresh && self.refresh();
                }
            }
        },

        methods: {
            init(){
                var self = this;

                self.$scroll = self.$refs.scroll;
                self.autoRefresh && self.refresh(false);
            },

            onScrolling(){
                this.pullup2load && this.$scroll.limitType() == -1 && this.load();
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

            refresh(){
                var self = this;

                self.page = 0;
                self.isCompleted = false;
                self.isLoading = false;
                self.$scroll.refresh(false);
                self.$emit('refresh');
                setTimeout(() => self.load(), 0);
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
                    && (self.rows.length == self.data.length || self.page == 0)
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
                        self.page == 0 ? self.setData(data) : self.addData(data);  
                        self.renderRows();
                        self.$emit('xhr:success', data);
                    },
                    error(data){
                        self.error = data;
                        self.$emit('xhr:error');
                        self.isLoading = false;
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

                if(page == 1){
                    self.rows = rows;
                    self.$emit('refresh:success', rows);
                    self.pulldown2refresh && self.$scroll.recover();
                }else{
                    self.rows = self.rows.concat(rows);
                }

                self.isLoading = false;
                self.$emit('rows:render', rows);
            }
        }
    }
</script>