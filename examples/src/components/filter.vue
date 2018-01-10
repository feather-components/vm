<template>
    <page>
        <topbar slot="header">filter组件</topbar>

        <div style="display: flex;">
            <dropdown label="1级单选">
                <single-filter :source="source" v-model="s_val"></single-filter>
                <div class="dropdown-footer" style="display: flex; height: 0.48rem; width: 100%;">
                    <btn type="drak" :square="true" style="width: 30%;" @click="val = ''">重置</btn>
                    <btn type="main" :square="true" style="width: 70%;">提交</btn>
                </div>
            </dropdown>
            <dropdown label="1级多选">
                <multiple-filter :source="source" v-model="m_val" :unlimit="1"></multiple-filter>
            </dropdown>
            <dropdown label="N级联动">
                <link-filter :level="3" :source="source" v-model="l_val" :unlimit-value="-1" :unlimit-start-group="0"></link-filter>
            </dropdown>


        </div>        
        <link-multiple-filter :source="source" v-model="lm_val"></link-multiple-filter>
        
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
    } from 'vm';

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
                s_val: 3,
                m_val: [1],
                l_val: ['1', '1-1'],
                lm_val: null
            }
        },

        watch: {
            s_val(v){
                Toast(v);
            },
            
            m_val(v){
                Toast(v);
            },

            l_val(v){
                Toast(v)
            },

            lm_val(v){
                Toast(v)
            }
        },

        mounted () {
			// setInterval(() => {
			// 	console.log(this.lm_val, 999)
			// }, 1000)
        }

        // methods: {
        //     change(value, label, data){
        //         Toast('选择了' + JSON.stringify(data));
        //     }
        // }
    }
</script>