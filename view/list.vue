<template>
<Scroll ref="scroll" :is2bottom="is2bottom" :is2top="is2top">
    <div class="vmui-list">
        <div class="vmui-list-pull" v-if="pulldown2refresh" ref="pd">
            <slot name="refresh"><i class="vmui-list-loading-icon"></i>下拉刷新数据</slot>
        </div>

        <div class="vmui-list-header">
            <slot name="header"></slot>
        </div>

        <ul class="vmui-list-rows" ref="rows">
            <li v-for="(item, index) in rows" v-html="rowFormatter(item)"></li>
        </ul>

        <div class="vmui-list-loading" v-if="showLoadingStatus">
            <slot name="loading"><i class="vmui-list-loading-icon"></i>正在加载中</slot>
        </div>

        <div class="vmui-list-error" v-if="showErrorStatus">
            <slot name="error">网络异常，加载失败，上滑尝试重新加载</slot>
        </div>

        <div class="vmui-list-nomore" v-if="showNoMoreStatus" ref="nomore">
            <slot name="nomore">~没有更多了~</slot>
        </div>

        <div class="vmui-list-empty" v-if="showEmptyStatus">
            <slot name="empty"><i class="vmui-list-empty-icon"></i><br />没有任何结果~</slot>
        </div>
    </div>
</Scroll>
</template>

<style>
.vmui-list{
    font-size: 1em;
}

.vmui-list-pull, .vmui-list-loading, .vmui-list-error, .vmui-list-nomore, .vmui-list-empty{
    text-align: center;
    padding: 5px;
    color: #878787;
    width: 100%;
}

.vmui-list-pull{
    position: absolute;
    transform: translateY(-100%);
    -webkit-transform: translateY(-100%);
}

.vmui-list-loading-icon{
    display: inline-block;
    width: 1em;
    height: 1em;
    background-image: url(./loading.gif?__inline);
    background-size: 100%;
    transform: translateY(3px);
    -webkit-transform: translateY(3px);
    margin-right: 5px;
}

.vmui-list-rows{
    padding: 0px;
    margin: 0px;
    list-style: none;

    *{
        margin: 0px;
        padding: 0px;
    }
}

.vmui-list-empty-icon{
    background: url(./empty.png?__inline);
    width: 130px;
    height: 130px;
    display: inline-block;
    margin-bottom: 10px;
}
</style>

<script>
import Vue from 'vue';
import Resource from 'vue-resource';
import Scroll from '../scroll';
import Resize from '../resize';
import _ from '../helper';

Vue.use(Resource);

export default{
    props: {
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

        rowFormatter: {
            type: Function,
            default(rowData){
                return rowData;
            }
        },

        maxCountPerPage: {
            type: Number,
            default: 20
        },

        params: {
            type: Object,
            default(){
                return {}
            }
        },

        pulldown2refresh: {
            type: Boolean,
            default: false
        },

        pullup2load: {
            type: Boolean,
            default: false
        }
    },

    data(){
        return {
            data: [],
            rows: [],
            _params: this.params,
            isLoading: false,
            isCompleted: false,
            page: 0,
            error: 0,
            scrolling: false,
            $scroll: null
        }
    },

    computed: {
        showLoadingStatus(){
            return !this.isCompleted && this.pullup2load && this.page > 1 && !this.error
        },

        showErrorStatus(){
            return this.error && !this.isLoading;
        },

        showNoMoreStatus(){
            return (this.page > 1 || this.page == 1 && this.rows.length) && this.isCompleted;
        },

        showEmptyStatus(){
            return !this.rows.length && this.isCompleted;
        },

        isFirstPage(){
            return this.page <= 1;
        }
    },

    components: {
        Scroll
    },

    mounted(){
        if(typeof this.source != 'string'){
            this.setData(this.source);
        }

        this.setParams(this.params);    
        this.$nextTick(() => this.init());
    },

    methods: {
        init(){
            this.$scroll = this.$refs.scroll;
            this.initEvents();
            this.refresh();
        },

        initEvents(){
            var self = this;

            if(self.pulldown2refresh){
                self.$scroll.on('leave2top', () => {
                    setTimeout(() => this.refresh(true));
                });
            }

            if(self.pullup2load){
                self.$scroll.on('scroll2bottom', () => this.load());
                self.$scroll.on('scrollEnd2bottom', () => this.load());
            }
        },

        setParams(params){
            this._params = params;
        },

        setData(source = []){
            this.data = [];
            this.addData(source);
        },

        addData(source){
            this.data = this.data.concat(this.dataFormatter(source) || []);
        },

        is2bottom(v){
            return v <= (this.pullup2load ? 40 : 0);
        },

        is2top(v){
            return v >= (this.pulldown2refresh ? _.height(this.$refs.pd) : 0);
        },

        refresh(pulldownFx = this.pulldown2refresh){
            var self = this;

            self.page = 0;
            self.isCompleted = false;
            self.isLoading = false;
            pulldownFx && self.$scroll.scrollTo(0, _.height(self.$refs.pd));
            self.$emit('refresh');
            setTimeout(() => self.load(), 500);
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

            self.page++;
            self.isLoading = true;

            setTimeout(() => {
                if(typeof self.source == 'string' && (self.rows.length == self.data.length || self.isFirstPage)){
                    self.loadRemote();
                }else{
                    self.renderScreen();
                    self.isLoading = false;
                }
            }, 0);
        },

        loadRemote(){
            var self = this;

            self.$http.get(self.source, Object.assign(this._params, {
                page: self.page,
                count: self.maxCountPerPage,
                random: Math.random()
            })).then((response) => {
                if(self.isFirstPage){
                    self.setData(response.body);
                }else{
                    self.addData(response.body);
                }
                
                self.renderScreen();
                self.isLoading = false;
                self.$emit('success');
            }, (response) => {
                self.isLoading = false;
                self.page--;
                self.error = response;
                self.$emit('error');
                self.afterRenderScreen();
            });
        },

        renderScreen(){
            var self = this;
            var rows = self.data.slice(self.maxCountPerPage * (self.page - 1), self.maxCountPerPage * self.page);

            if(!rows.length || !self.pullup2load){
                self.isCompleted = true;
                self.$emit('nomore');
            }

            self.$emit('renderScreen');

            if(rows.length){
                self.rows = self.isFirstPage ? rows : self.rows.concat(rows);
            }

            self.$nextTick(() => {
                self.afterRenderScreen();
                self.$refs.scroll.refresh();
            });
        },

        afterRenderScreen(){
            var self = this;
            self.isFirstPage && self.pulldown2refresh && self.back2top();
            self.$scroll.refresh();
        },

        back2top(){
            this.$scroll.scrollTo(0, 0, 500);
        }
    }
}
</script>