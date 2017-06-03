<template>
    <page>
        <topbar>
            dropdown组件
            <a slot="left" href="javascript:" v-popover="{
                actions: {
                    123: function(){},
                    1234: ''
                }
            }">1</a>
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
        Scroll,
        Popover
    } from 'vmui';

    export default{
        components: {
            Page, 
            Topbar,
            Dropdown,
            Scroll
        },

        directives: {Popover}
    }
</script>