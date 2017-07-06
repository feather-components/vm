<template>
    <page>
        <topbar slot="header">
            dropdown组件
        </topbar>
        <div style="display: flex; flex: 1;">
            <dropdown label="区域" style="width: 50%;">
                <scroll style="height: 300px;">
                    <div v-for="(item, a) of 100">{{item}}</div>
                </scroll>
            </dropdown>
            <dropdown label="筛选" style="width: 50%;">
                <scroll axis="x">
                    <div style="display: inline-block" v-for="(item, a) of 100">{{item}}</div>
                </scroll>
            </dropdown>
        </div>
    </page>
</template>


<script>
    import {
        Page,
        Topbar,
        Dropdown,
        Scroll
    } from 'vm';

    export default{
        components: {
            Page, 
            Topbar,
            Dropdown,
            Scroll
        }
    }
</script>