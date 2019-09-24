<template>
    <vm-page>
        <vm-topbar slot="header">form系列组件</vm-topbar>

        <vm-scroll ignores=".textarea">
            <vm-form-row vertical-layout label="输入价格">
                <vm-input />
            </vm-form-row>

            <vm-form-row align="right" label="输入价格">
                <vm-input />
                <vm-forward :arrow-size="14" @click="onForWard"/>
            </vm-form-row>

            <vm-form-row label="icon checker">
                <vm-checker-group :options="years" icon-type @change="onCheckerChange" v-model="checkers" />
            </vm-form-row>

            <vm-form-row label="checker">
                <vm-checker-group :options="years" @change="onCheckerChange" v-model="checkers">
                    
                </vm-checker-group>
            </vm-form-row>
        
            <vm-form-row label="textarea">
                <vm-textarea placeholder="多行文本" class="textarea" />
            </vm-form-row>            


            <!-- <vm-textarea label="多行文本" placeholder="多行文本" tips="tips" v-model="postData.b">这里是一些备注之类
                <template slot="label">多行&nbsp;<span style="font-size: 0.12rem" :style="{color: postData.b.length > 10 ? 'red' : ''}">({{postData.b.length}}/10)</span></template>
            </vm-textarea>

            <vm-textarea label="多行文本" placeholder="多行文本" tips="tips" v-model="postData.b">这里是一些备注之类
                <template slot="label">多行&nbsp;<span style="font-size: 0.12rem" :style="{color: postData.b.length > 10 ? 'red' : ''}">({{postData.b.length}}/10)</span></template>

                <template slot="icon"> <vm-forward /></template>
            </vm-textarea>
        -->
            <vm-form-row label="开关切换" align="right">
                <vm-switch checked />
            </vm-form-row>

<!-- 
            <vm-dateinput label="选择日期" v-model="postData.date" /> -->
<!-- 
            <vm-select label="下拉" :source="selectList" v-model="postData.e" /> -->

            <!-- <images label="上传图片" v-model="postData.f" :size="10" v-lightbox /> -->
        </vm-scroll>
        <vm-button style="margin: 10px auto; width: 90%;" size="large" @click="submit" slot="footer">提交</vm-button>
        <vm-datepicker visible formatter="yyyy/mm/dd hh:ii" value="2017/10/01" max-date="2018/10/01 02:02" />
    </vm-page>
</template>

<script>
import Source from '../filter.json';

const selectList = [
    [
        {
            label: '第一个',
            value: 1,
            children: [
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
            ]
        },
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
];

const style = {
    width: '100%',
    border: 0,
    lineHeight: '44px'
};

export default {
    data () {
        return {
            abc: '11:11',
            checkers: 2019,
            aaa: '',
            postData: {
                a: '33',
                b: '333',
                c: null,
                d: null,
                e: [1, 2],
                f: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4152229571,503740049&fm=11&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=74474160,773507576&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=30837642,1835949245&fm=26&gp=0.jpg'],
                g: true,
                h: [],
                date: '2017/01/01'
            },
            source: Source,
            selectList: selectList,
            show: false,
            val: [2, 3],
            style: style,
            dateValue: '2018-1-1',
            dateShow: false,
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
                }
            ]
        };
    },

    mounted () {

        setTimeout(() => {
            this.checkers = [2018];
        }, 1000);

        document.activeElement.blur();
        setTimeout(() => {
            this.postData.f.push('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4152229571,503740049&fm=11&gp=0.jpg');
        }, 10000);

    },

    watch: {
        checker (v) {
            console.log(v);
        },
        postData (v) {
            console.log(v);
        },

        val (v) {
            console.log(v);
        },

        aaa (v) {
            console.log('jfkdjfkdsfds', v)
        },

        abc (v) {
            console.log(v)
        }
    },

    methods: {
        onForWard () {
            alert('您点击了ForWard')
        },
        onCheckerChange (...args) {
            console.log(...args);
        },
        onInputinput (...args) {
            console.log(...args)
        },

        selectFormatter (data) {
            return data.g || data;
        },

        submit () {
            Toast(JSON.stringify(this.postData, null, '\t'));
        },

        showIosselect () {
            this.show = true;
        },

        onSure (val) {
            console.log(val, '发发');
            this.show = false;
            console.log(this.val, 8888);
            //                this.val = val[0].label + '-' + val[1].label
            //                this.val = val
        },

        showDatepicker () {
            this.dateShow = true;
        },

        sureDate (val) {
            console.log(val, '发发发');
            this.dateShow = false;
        },

        dateClose () {
            	this.dateShow = false;
        }
    }
};
</script>