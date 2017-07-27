<template>
    <page>
        <topbar slot="header">form系列组件</topbar>

        <scroll>
            <text-input label="单行文本" placeholder="单行" v-model="postData.a"  />
            <text-input label="多行文本" :multiline="true" placeholder="多行" v-model="postData.b" v-counter="{limit: 30}" />

            <vm-switch label="切换开关" v-model="postData.g" />

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

            <images label="上传图片" v-model="postData.f" :size="10">
                <template slot="msg">({{postData.f.length}}/10，至少上传1张)</template>
            </images>

            <form-box label="单选">
                <single-filter :source="source"></single-filter>
            </form-box>

            <form-box label="2级多选">
                <link-multiple-filter :source="source" style="height: 150px;"></link-multiple-filter>
            </form-box>

            <form-box label="iosselect">
                <text-input label="单行文本" placeholder="请选择" v-model="val"  @click="showIosselect" :readonly="true"/>
            </form-box>

            <form-box label="datepicker">
                <text-input label="单行文本" placeholder="请选择日期" v-model="dateValue"  @click="showDatepicker" :readonly="true"/>
            </form-box>


        </scroll>
        <btn style="margin: 10px 0px; width: 90%;" type="drak" @click="submit" slot="footer">提交</btn>
        <iosselect :source="selectList" @confirm="onSure"  @close="close" v-if="show" v-model="val"></iosselect>
        <datepicker @confirm="sureDate" v-if="dateShow" format="yyyy-mm-dd" min-date="2017-8-1" max-date="2019-8-1" @close="dateClose" v-model="dateValue"></datepicker>
    </page>
</template>

<script>

    const selectList = [
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
            {label: '11', value: 11},
            {label: '11', value: 11},
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
            {label: '11', value: 11},
            {label: '11', value: 11}
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
            {label: '9', value: 8},
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
        Counter,
        SingleFilter,
        SearchBar,
        Searchbar,
        Switch,
        FormBox,
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
            FormBox,
            Btn: Button,
            vmSwitch: Switch,
            LinkMultipleFilter,
            Iosselect,
            Datepicker
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
                    f: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4152229571,503740049&fm=11&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=74474160,773507576&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg'],
                    g: true,
                    h: []
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

			document.activeElement.blur()
        },

        watch: {
            postData(v){
                console.log(v)
            }
        },

        methods: {
            submit(){
                Toast(JSON.stringify(this.postData, null, '\t'));
            },

            showIosselect() {
                this.show = true
            },
            close() {
                this.show = false
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