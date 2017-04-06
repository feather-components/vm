<template>
<Page position="right" :fx="true" :visible="visibility" class="vmui-search" ref="page">
    <Topbar :leftEnabled="false">
        <search-bar :style="{
            'margin-right': '2.5em'
        }" :placeholder="placeholder" :maxlength="maxlength" ref="search" />
        <a href="javascript:" class="vmui-search-cancel" @touchstart="close()" slot="right">取消</a>
    </Topbar>

    <List ref="list" :options="listOptions" :pullup2load="false" :pulldown2refresh="false" :auto-refresh="false">
        <template slot="header">
            <div class="vmui-search-header">
                <slot name="header"></slot>
            </div>

            <div class="vmui-search-desc" v-if="!isEmpty">
                <slot name="">搜索结果</slot>
            </div>

            <div class="vmui-search-default" v-if="empty2load && !value">
                <slot name="default"></slot>
            </div>
        </template>

        <template slot="nores" v-if="$slots.nores">
            <slot name="nores"></slot>
        </template>
    </List>
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

.vmui-search-desc{
    font-size: 0.12rem;
    padding: .16rem 0px;
}

.vmui-search{
    .vmui-list{
        padding: 0px .16rem;

        li{
            border-bottom: 1px solid #E1E1E1;
        }
    }

    .vmui-list-rows{
        margin-bottom: .3rem;
    }
}
</style>

<script>
import Page from '../page';
import Topbar from '../topbar';
import SearchBar from '../searchbar';
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
        listOptions: {
            type: Object,
            default(){
                return {}
            }
        },

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

        kw: 'kw'
    },

    mounted(){
        this.$search = this.$refs.search;
        this.$list = this.$refs.list;
        this.initEvents();
    },

    data(){
        return {
            caches: {},
            value: '',
            isEmpty: true
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

            self.$list.$on('clickRow', (item, index) => {
                self.$emit('select', item, index);
            })

            self.$list.$on('success', (data) => {
                self.caches[self.value] = data;
            });

            self.$list.$on('renderRows', (data) => {
                self.isEmpty = !!!data.length;
            });
        },

        load(){
            var self = this;

            if(!self.empty2load && !self.value){
                return;
            }

            if(self.caches[self.value]){
                self.$list.setData(self.caches[self.value]);
                self.$list.refresh(false, false);
            }else{
                self.$list.setParams({
                    kw: self.value
                }, true);
                self.$list.refresh(false);
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
        }
    }
}
</script>