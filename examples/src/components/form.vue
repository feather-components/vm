<template>
    <page>
        <topbar slot="header">form系列组件</topbar>

        <scroll>
            <text-input label="单行文本" placeholder="单行" v-model="postData.a"><vm-forward :arrow-size="0.14" @click="alert(3)" />
   
            </text-input>

            <vm-textarea label="多行文本" placeholder="多行文本" tips="tips" v-model="postData.b">这里是一些备注之类
                <template slot="label">多行&nbsp;<span style="font-size: 0.12rem" :style="{color: postData.b.length > 10 ? 'red' : ''}">({{postData.b.length}}/10)</span></template>
            </vm-textarea>

            <vm-textarea label="多行文本" placeholder="多行文本" tips="tips" v-model="postData.b">这里是一些备注之类
                <template slot="label">多行&nbsp;<span style="font-size: 0.12rem" :style="{color: postData.b.length > 10 ? 'red' : ''}">({{postData.b.length}}/10)</span></template>

                <template slot="icon"> <vm-forward /></template>
            </vm-textarea>

            <vm-switch label="切换开关" v-model="postData.g" />

            <radios label="少于4个单选" :options="[
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

            <radios label="多于3个单选" :options="[
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
                }
            ]" v-model="postData.c" />

            <checkboxes label="多选" :options="[
                {
                    label: '不限',
                    value: -1
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
            ]" v-model="postData.d" :unlimit="-1" />

            <vm-dateinput label="选择日期" v-model="postData.date" />

            <vm-select label="下拉" :source="selectList" v-model="postData.e" />

            <images label="上传图片" v-model="postData.f" :size="10" v-lightbox />
        </scroll>
        <btn style="margin: 10px 0px; width: 90%;" type="drak" @click="submit" slot="footer">提交</btn>
    </page>
</template>

<script>

    const selectList = [
        [
            {label: '第一个', value: 1, children: [
                {label: '1', value: 1},
                    {label: '第二个', value: 2},
                    {label: '3', value: 3},
                    {label: '4', value: 4},
                    {label: '5', value: 5},
                    {label: '6', value: 6},
                    {label: '7', value: 7},
                    {label: '8', value: 8},
                    {label: '9', value: 9},
                    {label: '10', value: 10},
                    {label: '11', value: 11},
                    {label: '11', value: 12}
            ]},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
            {label: '5', value: 5},
            {label: '6', value: 6},
            {label: '7', value: 7},
            {label: '8', value: 8},
            {label: '9', value: 9},
            {label: '10', value: 10},
            {label: '11', value: 11},
            {label: '11', value: 12}
        ],
        [
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
            {label: '5', value: 5},
            {label: '6', value: 6},
            {label: '7', value: 7},
            {label: '8', value: 8},
            {label: '9', value: 9},
            {label: '10', value: 10},
            {label: '12', value: 12},
            {label: '13', value: 13},
            {label: '14', value: 14}
        ]
    ]

    const style = {
        width: '100%',
        border: 0,
        lineHeight: '44px'
    }

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
        SingleFilter,
        SearchBar,
        Searchbar,
        Switch,
        LinkMultipleFilter,
        Iosselect,
        Datepicker
    } from 'vm';
    
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
            Btn: Button,
            vmSwitch: Switch,
            LinkMultipleFilter,
            Iosselect,
            Datepicker
        },
        
        data(){
            return {
                postData: {
                    a: '33',
                    b: '333',
                    c: null,
                    d: null,
                    e: [1,2],
                    f: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4152229571,503740049&fm=11&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=74474160,773507576&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg'],
                    g: true,
                    h: [],
                    date: '2017/01/01'
                },

                source: Source,

                selectList: selectList,
                show: false,
                val: [2,3],
                style: style,
				dateValue: '2018-1-1',
				dateShow: false,
//				initDate: [2018, 1, 1],

				years: [
                    {
                    	label: 2015,
                        value: 2015
                    },
					{
						label: 2016,
						value: 2016
					},
					{
						label: 2017,
						value: 2017
					},
					{
						label: 2018,
						value: 2018
					},
					{
						label: 2019,
						value: 2019
					},
					{
						label: 2020,
						value: 2020
					},
					{
						label: 2021,
						value: 2021
					},
                ]
            };
        },

        mounted() {
//          setInterval(() => {
//          	  console.log(this.val)
//          }, 1000)

            setTimeout(() => {
                this.postData.date = '2016/01/01';
            }, 5000)

			document.activeElement.blur();
            setTimeout(() => {
                this.postData.f.push('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4152229571,503740049&fm=11&gp=0.jpg')
            }, 10000);
        },

        watch: {
            postData(v){
                console.log(v)
            },

            val(v){
                console.log(v)
            }
        },

        methods: {
            selectFormatter(data){
                return data.g || data;
            },

            submit(){
                Toast(JSON.stringify(this.postData, null, '\t'));
            },

            showIosselect() {
                this.show = true
            },
 
            onSure(val) {
                console.log(val, '发发')
                this.show = false
				console.log(this.val, 8888)
//                this.val = val[0].label + '-' + val[1].label
//                this.val = val
            },

			showDatepicker() {
				this.dateShow = true
            },

            sureDate(val) {
                console.log(val, '发发发')
                this.dateShow = false
            },

			dateClose() {
            	this.dateShow = false
            }
        }
    }
</script>