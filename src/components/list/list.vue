<template>
    <component 
        ref="scroll" class="vm-list" :is="Component" :scrollbars="scrollbars"
        @refresh="refresh" 
        @scrolling="onScrolling"
        @draging="try2load"
        @scroll:end="try2load"
    >
        <div class="vm-list-header" v-if="$slots.header">
            <slot name="header"></slot>
        </div>

        <div>
            <slot name="rows" :data="rows">
                <div class="vm-list-row" v-for="(item, index) in rows" :key="index" @click="$emit('row:click', item, index)">
                    <slot name="row" :data="item" :index="index">{{item}}</slot>
                </div>
            </slot>
        </div>

        <div class="vm-list-status">
            <slot name="if-loading" v-if="ifLoading">
                <loading /> 正在加载中
            </slot>
            <slot name="if-failed" v-else-if="ifFailed">
                <span class="vm-list-status-box">网络异常，加载失败</span>
            </slot>
            <slot name="if-empty" v-else-if="ifEmpty">
                <span class="vm-list-status-box">神马都木有~</span>
            </slot>
            <slot name="if-nomore" v-else-if="isCompleted">就这么多啦~</slot>
        </div>

        <div class="vm-list-footer">
            <slot name="footer"></slot>
        </div>
    </component>
</template>

<style lang="less">
.vm-list-status {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0px;
    color: #878787;
    width: 100%;
    font-size: 14px;
}

.vm-list-status-box {
    display: inline-block;
    padding: 20px 0px;
}
</style>

<script>
import {Pulldown2refresh, Scroll} from '../scroll';
import Loading from '../loading';
import {Dom, Util} from '../../helper';
import Config from '../../config';

export default {
    name: 'list',

    components: {
        Loading
    },

    props: {
        optimize: {
            type: Boolean,
            default: true
        },

        scrollbars: {
            type: Boolean,
            default: true
        },

        autoRefresh: {
            type: Boolean,
            default: true
        },

        api: {
            type: Function,
            default: null
        },

        maxCountPerPage: {
            type: Number,
            default: 20
        },

        params: {
            type: Object,
            default () {
                return {};
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

    data () {
        return {
            Component: !this.pulldown2refresh ? Scroll : Pulldown2refresh,
            data: [],
            rows: [],
            _params: {},
            isLoading: false,
            isCompleted: false,
            page: 0,
            error: null,
            $scroll: null,
            _source: '',
            unitHeights: []
        };
    },

    computed: {
        ifLoading () {
            return !this.isCompleted && this.pullup2load && !this.error && this.page >= 1;
        },

        ifFailed () {
            return !this.isCompleted && this.error && !this.isLoading;
        },

        ifCompleted () {
            return this.page >= 1 && this.rows.length && this.isCompleted;
        },

        ifEmpty () {
            return !this.rows.length && this.isCompleted;
        }
    },

    mounted () {
        this.setParams(this.params);
        this.$nextTick(() => {
            this.$scroll = this.$refs.scroll;
            this.autoRefresh && this.refresh(false);
        });
    },

    watch: {
        source () {
            this.autoRefresh && this.refresh();
        },

        params: {
            deep: true,
            handler (v) {
                this.setParams(v);
                this.autoRefresh && this.refresh();
            }
        }
    },

    methods: {
        try2load (...args) {
            this.pullup2load && this.page > 0 && this.$scroll.limitType() == -1 && this.load();
        },

        onScrolling (...args) {
            this.$emit('scrolling', ...args);
        },  

        setParams (params, append) {
            if (append) {
                this._params = Object.assign({}, this._params, params);
            } else {
                this._params = Object.assign({}, params);
            }
        },

        setData (data = []) {
            this.data = [];
            this.addData(data);
        },

        scrollTo (...args) {
            this.$scroll.scrollTo(...args);
        },

        scrollToElement (...args) {
            this.$scroll.scrollToElement(...args);
        },

        addData (data) {
            this.data = this.data.concat(data || []);
            this.$emit('data:add', data);
        },

        refresh (animation = true) {
            this.page = 0;
            this.isCompleted = false;
            this.isLoading = false;
            this.$scroll.refresh(animation, false);
            this.$emit('refresh');
            setTimeout(() => this.load(), 10);
        },

        load () {
            this.error = null;

            if (this.isCompleted || this.isLoading) {
                return false;
            }

            if (this.rows.length == this.data.length || this.page == 0) {
                this.loadByRemote();
            } else {
                this.renderRows();
            }
        },

        loadByRemote () {
            let params = Object.assign({}, this._params);

            params[Config('list.label.page')] = this.page + 1;
            params[Config('list.label.persize')] = this.maxCountPerPage;

            this.isLoading = true;

            let ajax = this.api(params);

            Util.acm(ajax, this).then((data) => {
                this.page == 0 ? this.setData(data) : this.addData(data);
                this.$emit('fetch:success', data);
                this.fetchComplete();
            }, (data) => {
                this.error = true;
                this.$emit('fetch:fail', data);
                this.fetchComplete();
            });
        },

        fetchComplete () {
            let page = ++this.page;

            if (!this.error) {
                let rows = this.data.slice(this.maxCountPerPage * (page - 1), this.maxCountPerPage * page);

                if (!this.pullup2load || rows.length < this.maxCountPerPage) {
                    this.isCompleted = true;
                    this.$emit('nomore');
                }

                if (page == 1) {
                    this.rows = rows;
                    this.$emit('refresh:success', rows);
                    this.pulldown2refresh && this.$scroll.recover();
                } else {
                    this.rows = this.rows.concat(rows);
                }
            } else if (page == 1) {
                this.page = 0;
                this.$emit('refresh:error', this.rows = []);
                this.pulldown2refresh && this.$scroll.recover();
            }

            this.$emit('rows:render', this.rows);
            this.isLoading = false;
        }
    }
};
</script>