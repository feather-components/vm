<template>
    <div class="vm-search-history-container" v-show="historys.length">
        <div class="vm-search-history-header">
            {{title}}
            <a href="javascript:" @click="onClearClick" class="vm-searcy-history-clear">
                <slot name="clear">清除</slot>
            </a>
        </div>
        <div class="vm-search-historys">
            <a v-for="(item, index) of historys" class="vm-search-history" href="javascript:" @click="clickHistory(item, index)">
                <slot name="history-row" :data="item">{{item.length > 20 ? item.substring(0, 20) + '..' : item}}</slot>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '搜索记录'
        },

        id: {
            type: String,
            default () {
                if (location.hash) {
                    return location.hash.replace(/\?.*/, '');
                } 

                return location.pathname;
            }
        }
    }
};
</script>

<style>
.vm-search-history-header {
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
}

.vm-search-historys {
    margin: 8px 0px;
}

.vm-search-history {
    background: #eee;
    margin-bottom: 8px;
    margin-right: 8px;
    height: 24px;
    line-height: 24px;
    display: inline-block;
    border-radius: 10px;
    padding: 0px 10px;
}

.vm-searcy-history-clear {
    float: right;
    color: #6281C2;
}
</style>