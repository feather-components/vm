<template>
    <vm-page>
        <vm-topbar slot="header">search</vm-topbar>
        <vm-searchbar readonly style="background: blue; " v-model="wd" :inner-style="{
            backgroundColor: '#fff', borderRadius: '0px'
            }" placeholder="请输入关键词，百度搜索" @click="onClick">
        </vm-searchbar>

        <vm-list
            :api="api"
            :params="{'wd': wd}"
            :auto-refresh="true"
        >
            <template slot="row" scope="props">
                <div class="row">
                    <a :href="'https://www.baidu.com/s?f=8&rsv_bp=1&rsv_idx=1&word=' + props.data + '&tn=97925205_hao_pg'" class="inner">
                        {{props.data}}
                    </a>
                </div>
            </template>
        </vm-list>

        <vm-overlay v-model="overlayVisible" style="width: 100%; height: 100%;" position="right">
            <vm-search :api="api" v-model="wd" @confirm="hide" @cancel="hide" ref="search"></vm-search>
        </vm-overlay>
    </vm-page>
</template>

<style scoped>
.row{
    font-size: 16px;
    padding: 10px 10px 0px 10px;
}

.inner{
    height: 35px;
    line-height: 35px;
    background: #eee;
    display: block;
    text-decoration: none;
    color: #333;
    padding-left: 10px;
}
</style>

<script>
import Ajax from 'ajax';

export default {
    data () {
        return {
            wd: '',
            overlayVisible: false
        };
    },

    watch: {
        wd (v) {
            console.log(v);
        }
    },

    methods: {
        api (params) {
            if (typeof params == 'string') {
                params = {
                    wd: params
                };
            }

            return new Promise((resolve, reject) => {
                Ajax({
                    url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&cb=?',
                    data: params,
                    dataType: 'json',
                    success (data) {
                        resolve(data.s);
                    },
                    error () {
                        reject();
                    }
                });
            });
        },

        onClick () {
            this.overlayVisible = true;
            this.$refs.search.focus();
        },

        hide () {
            this.overlayVisible = false;
        }
    }
};
</script>
