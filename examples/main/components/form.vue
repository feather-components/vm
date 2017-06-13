<template>
    <page>
        <topbar>form系列组件</topbar>

        <scroll>
            <text-input label="单行文本" placeholder="单行" v-model="postData.a" v-counter="{limit: 30}" />
            <text-input label="多行文本" :multiline="true" placeholder="多行" v-model="postData.b" />

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
                }
            ]" v-model="postData.d" />

            <vm-select label="下拉" placeholder="下拉选择"  :options="[
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
            ]" v-model="postData.e" />

            <file label="上传图片" v-model="postData.f" :size="2" />
        </scroll>

        <btn slot="footer" style="margin: 10px 0px; width: 90%;" type="drak" @click="submit">提交</btn>
    </page>
</template>

<style scoped>

</style>

<script>
    import {
        Page,
        Topbar,
        TextInput,
        Radios,
        Checkboxes,
        Select,
        File,
        Button,
        Scroll,
        Toast,
        Counter,
        SearchBar,
        Searchbar
    } from 'vmui';

    export default{
        components: {
            Page, 
            Topbar,
            TextInput,
            Radios,
            Checkboxes,
            vmSelect: Select,
            File,
            Scroll,
            Btn: Button
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
                    e: null,
                    f: null
                }
            };
        },

        methods: {
            submit(){
                Toast(JSON.stringify(this.postData, null, '\t'));
            }
        }
    }
</script>