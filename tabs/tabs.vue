<template>
<Scroll ref="scroll" :is2bottom="is2bottom" :is2top="is2top" :style="style">
    <div class="vmui-list">
        <div class="vmui-list-pull" v-if="pulldown2refresh" ref="pd">
            <slot name="pulldown-msg" v-if="!isRefreshing && !intop">下拉刷新数据</slot>
            <slot name="pullleave-msg" v-if="!isRefreshing && intop">松手刷新数据</slot>
            <slot name="refresh-msg" v-if="isRefreshing"><i class="vmui-list-loading-icon"></i>正在刷新数据</slot>
        </div>

        <div class="vmui-list-header">
            <slot name="header"></slot>
        </div>

        <ul class="vmui-list-rows" ref="rows">
            <li v-for="(item, index) in rows" v-html="rowFormatter(item)" @click="$emit('clickRow', item, index)"></li>
        </ul>

        <div class="vmui-list-loading" v-if="showLoadingStatus">
            <slot name="loading"><i class="vmui-list-loading-icon"></i>正在加载中</slot>
        </div>

        <div class="vmui-list-error" v-if="showErrorStatus">
            <slot name="error">网络异常，加载失败</slot>
        </div>

        <div class="vmui-list-nomore" v-if="showNoMoreStatus" ref="nomore">
            <slot name="nomore">~没有更多了~</slot>
        </div>

        <div class="vmui-list-empty" v-if="showEmptyStatus">
            <slot name="nores"><i class="vmui-list-nores-icon"></i><br />没有任何结果~</slot>
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
    font-size: 12/16em;
}

.vmui-list-pull{
    position: absolute;
    transform: translateY(-100%);
    -webkit-transform: translateY(-100%);
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

.vmui-list-nores{
    margin-top: 20px;
}


</style>

<script>
import Vue from 'vue';
import Scroll from '../scroll';
import Resize from '../resize';
import _ from '../helper';
import Ajax from 'ajax';

export default{
    props: {
        options: {
            type: Object,
            default: function(){
                return {}
            }
        },

        autoRefresh: {
            type: Boolean,
            default: true
        },

        style: {
            type: Object,
            default: function(){
                return this.options.style;
            }
        },

        source: {
            default(){
                return this.options.source || [];
            }
        },

        dataFormatter: {
            type: Function,
            default(data = []){
                return this.options.dataFormatter ? this.options.dataFormatter(data) : data;
            }
        },

        rowFormatter: {
            type: Function,
            default(rowData){
                return this.options.rowFormatter ? this.options.rowFormatter(rowData) : rowData;
            }
        },

        maxCountPerPage: {
            type: Number,
            default(){
                return this.options.maxCountPerPage || 20;
            }
        },

        params: {
            type: Object,
            default(){
                return this.options.params || {};
            }
        },

        pulldown2refresh: {
            type: Boolean,
            default(){
                return this.options.pulldown2refresh || false;
            }
        },

        pullup2load: {
            type: Boolean,
            default(){
                return this.options.pullup2load || false;
            }
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
            intop: false
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
            this.autoRefresh && this.refresh();
        },

        initEvents(){
            var self = this;

            if(self.pulldown2refresh){
                self.$scroll.on('leave2top', () => {
                    this.intop = false;
                    setTimeout(() => this.refresh(true));
                });
            }

            if(self.pullup2load){
                self.$scroll.on('scroll2bottom', () => this.load());
                self.$scroll.on('scrollEnd2bottom', () => this.load());
            }
        },

        setParams(params, append){
            if(append){
                this._params = Object.assign(this._params, params);
            }else{
                this._params = params;
            }
        },

        setData(source = []){
            this.data = [];
            this.addData(source);
        },

        addData(source){
            this.data = this.data.concat(this.dataFormatter(source) || []);
        },

        is2bottom(distance){
            return distance <= (this.pullup2load ? 40 : 0);
        },

        is2top(distance){
            return this.intop = distance >= (this.pulldown2refresh ? _.height(this.$refs.pd) : 0);
        },

        refresh(pulldownFx = this.pulldown2refresh, clearData = true){
            var self = this;

            self.page = 0;
            self.isCompleted = false;
            self.isLoading = false;
            clearData && self.setData();
            pulldownFx && self.$scroll._translate(0, _.height(self.$refs.pd));
            self.isRefreshing = true;
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

            if(typeof self.source == 'string' && (self.rows.length == self.data.length || self.isRefreshing && !self.data.length)){
                self.loadRemote();
            }else{
                self.renderRows();
                self.isLoading = false;
            }
        },

        loadRemote(){
            var self = this;

            self.$http = Ajax({
                url: self.source,
                data: Object.assign(this._params, {
                    page: self.page,
                    count: self.maxCountPerPage
                }),
                dataType: 'json',
                success(data){
                    self.isRefreshing ? self.setData(data) : self.addData(data);  
                    self.renderRows();
                    self.$emit('success', data);
                },
                error(data){
                    self.page--;
                    self.error = data;
                    self.$emit('error');
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
            var rows = self.data.slice(self.maxCountPerPage * (self.page - 1), self.maxCountPerPage * self.page);

            if(!rows.length || !self.pullup2load){
                self.isCompleted = true;
                self.$emit('nomore');
            }

            self.$emit('renderRows', rows);

            if(rows.length){
                self.rows = self.isRefreshing ? rows : self.rows.concat(rows);
            }

            self.isRefreshing && self.$emit('refreshSuccess', rows);
            self.afterRenderRows();
        },

        afterRenderRows(){
            var self = this;
            self.isRefreshing && self.pulldown2refresh && self.back2top();
            self.isLoading = false;
            self.isRefreshing = false;
            setTimeout(() => self.$scroll.refresh());;
        },

        back2top(){
            !this.is2top() && this.$scroll.scrollTo(0, 0, 500);
        }
    }
}
</script>