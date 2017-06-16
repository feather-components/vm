<template>
    <page>
        <topbar>filter组件</topbar>

        <div style="display: flex;">
            <dropdown label="1级单选">
                <single-filter :source="source" style="height: 100px;" v-model="val"></single-filter>
                <link-multiple-filter :source="source"></link-multiple-filter>
                <div class="dropdown-footer" style="display: flex; height: 0.48rem; width: 100%;">
                    <btn type="drak" :square="true" style="width: 30%;" @click="val = ''">重置</btn>
                    <btn type="main" :square="true" style="width: 70%;">提交</btn>
                </div>
            </dropdown>
            <dropdown label="1级多选">
                <multiple-filter :source="source"></multiple-filter>
            </dropdown>
            <dropdown label="N级联动">
                <link-filter :level="3" :source="source" v-model="val"></link-filter>
            </dropdown>

            <dropdown label="2级多选">
                <link-multiple-filter :source="source"></link-multiple-filter>
            </dropdown>
        </div>        
        <single-filter :source="source" v-model="val"></single-filter>
        <link-multiple-filter :source="source"></link-multiple-filter>
        
        <btn type="main" style="width: 100%" :square="true" slot="footer">提交</btn>
    </page>
</template>

<style scoped>

</style>

<script>
    import {
        Page,
        Topbar,
        SingleFilter,
        LinkFilter,
        LinkMultipleFilter,
        MultipleFilter,
        Button,
        Toast,
        Dropdown,
        Scroll
    } from 'vmui';

    import Source from '../filter.json';

    export default{
        components: {
            Page, 
            Topbar,
            SingleFilter,
            LinkFilter,
            MultipleFilter,
            LinkMultipleFilter,
            Btn: Button,
            Dropdown,
            Scroll
        },

        data(){
            return {
                source: Source,
                val: 3
            }
        },

        // methods: {
        //     change(value, label, data){
        //         Toast('选择了' + JSON.stringify(data));
        //     }
        // }
    }
</script>