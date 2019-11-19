<template>
    <page>
        <topbar slot="header">
            page布局组件
        </topbar>
        <scroll scrollbars class="col">
            <div v-for="(i, a) of 100" :key="a" align="center">{{i}}页面内容主体页面内容主体页面内容主体页面内容主体</div>
        </scroll>
        <div slot="footer">固定在底部位置</div>
    </page>
</template>

<style scoped>
    .icon{
        font-size: 0.3rem;
        display: inline-block;
        margin-top: 0.07rem;
    }
</style>

<script>
import {
    Page,
    Topbar,
    Scroll
} from 'vm';

export default {
    components: {
        Page,
        Topbar,
        Scroll
    }
};
</script>