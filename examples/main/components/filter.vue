<template>
    <page>
        <topbar>filter组件</topbar>

        <div style="display: flex; flex: 1">
            <dropdown label="1级单选" style="width: 50%;">
                <single-filter :source="[
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },{
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    }
                ]" v-model="val"></single-filter>
                <div class="dropdown-footer" style="display: flex; height: 0.48rem; width: 100%;">
                    <btn type="drak" :square="true" style="width: 30%;">重置</btn>
                    <btn type="main" :square="true" style="width: 70%;">提交</btn>
                </div>
            </dropdown>
            <dropdown label="1级多选" style="width: 50%;">
                <single-filter :source="[
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    }
                ]" v-model="val"></single-filter>
            </dropdown>
        </div>        

        <single-filter :source="[
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },
                    {
                        label: '1',
                        value: 1
                    },
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },{
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    }
                ]" v-model="val"></single-filter>

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
        Button,
        Toast,
        Dropdown
    } from 'vmui';

    export default{
        components: {
            Page, 
            Topbar,
            SingleFilter,
            Btn: Button,
            Dropdown
        },

        data(){
            return {
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