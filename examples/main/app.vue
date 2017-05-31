<template>
    <page>
        <topbar :left-enabled="false">vmui使用文档</topbar>
        <list :source="['shade', 'shade', 'shade', 'shade']" class="navs">
            <template slot="row" scope="props">
                <a href="javascript:">{{props.data}}</a>
            </template>
        </list>
    </page>
</template>

<style scoped lang="less">
header{
    padding: 0px 10px;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
}

.main{
    display: flex;
    flex: 1;
}

.navs{
    a{
        height: 40px;
        line-height: 40px;
        padding: 0px 10px;
        display: block;
        text-decoration: none;
        color: #333;
        border-bottom: 1px solid #eee;
    }
}
</style>

<script>
import {
    Shade,
    Scroll,
    List,
    Page,
    Topbar
} from 'vmui';

export default{
    components: {
        Shade,
        Scroll,
        List,
        Page,
        Topbar
    }
}
</script>