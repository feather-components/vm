<template>
<Page position="right" :fx="true" :visible="visibility" class="vmui-search-view">
    <Topbar>
        <Search></Search>
        <a href="javascript:" class="vmui-search-view-cancel" @touchstart="close()">取消</a>
    </Topbar>
</Page>
</template>

<style>
.vmui-search-view-cancel{
    float: right;
    display: inline-block;
}

.vmui-search-view{
    .vmui-search-input{
        margin-right: 30px;
    }
}
</style>

<script>
import Page from '../page';
import Topbar from '../topbar';
import Search from '../search';

export default{
    mixins: [Page],

    props: {
        placeholder: {
            type: String,
            default: "请输入关键字进行搜索"
        }
    },

    data(){
        return {
            value: ''
        };
    },

    components: {
        Page,
        Topbar,
        Search
    },

    computed: {
        clearVisible(){
            return this.value.trim() != '';
        }
    },

    methods: {
        input(){
            this.$emit('input', this.value);
        },

        clear(){
            this.value = '';
            this.$emit('input', this.value);
            this.$emit('clear');
        },

        submit(){
            this.$emit('submit');
        }
    }
}
</script>