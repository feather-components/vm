<template>
    <page>
        <topbar slot="header">form系列组件</topbar>

        <scroll>
            <text-input label="单行文本" placeholder="单行" v-model="postData.a"  />
            <text-input label="多行文本" :multiline="true" placeholder="多行" v-model="postData.b" v-counter="{limit: 30}" />

            <radios label="单选" :options="[
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
            ]" v-model="postData.c" />

            <checkboxes label="多选" :options="[
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
                    label: '4',
                    value: 4
                },

                {
                    label: '5',
                    value: 5
                },

                {
                    label: '6',
                    value: 6
                }
            ]" v-model="postData.d" />

            <vm-select label="下拉"  :options="[
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
                    label: '4',
                    value: 4
                },

                {
                    label: '5',
                    value: 5
                },

                {
                    label: '6',
                    value: 6
                }
            ]" v-model="postData.e" />

            <images label="上传图片" v-model="postData.f" :size="10" />

            <form-box label="单选">
                <single-filter :source="source"></single-filter>
            </form-box>

            <form-box label="2级多选">
                <link-multiple-filter :source="source" style="height: 150px;"></link-multiple-filter>
            </form-box>
        </scroll>

        <btn slot="footer" style="margin: 10px 0px; width: 90%;" type="drak" @click="submit">提交</btn>
    </page>
</template>

<script>
    import {
        Page,
        Topbar,
        TextInput,
        Radios,
        Checkboxes,
        Select,
        Images,
        Button,
        Scroll,
        Toast,
        Counter,
        SingleFilter,
        SearchBar,
        Searchbar,
        FormBox,
        LinkMultipleFilter
    } from 'vmui';

    import Source from '../filter.json';

    export default{
        components: {
            Page, 
            Topbar,
            TextInput,
            SingleFilter,
            Radios,
            Checkboxes,
            vmSelect: Select,
            Images,
            Scroll,
            FormBox,
            Btn: Button,
            LinkMultipleFilter
        },

        directives: {
            Counter
        },

        data(){
            return {
                postData: {
                    a: null,
                    b: null,
                    c: null,
                    d: null,
                    e: 2,
                    f: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg']
                },

                source: Source
            };
        },

        watch: {
            postData(v){
                console.log(v)
            }
        },

        methods: {
            submit(){
                Toast(JSON.stringify(this.postData, null, '\t'));
            }
        }
    }
</script>