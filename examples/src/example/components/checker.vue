<template>
    <vm-page>
        <vm-topbar slot="header">checker</vm-topbar>
            <br />
            <br />
            <vm-form-row label="checker">
                <vm-checker>选中</vm-checker>
            </vm-form-row>

            <vm-form-row label="checker square">
                <vm-checker square>确定</vm-checker>
            </vm-form-row>

            <vm-form-row label="checker group">
                <vm-checker-group :options="years" icon-type @change="onCheckerChange" v-model="checkers" />
            </vm-form-row>

            <vm-form-row label="checker radio">
                <vm-checker-group radio :options="years" @change="onCheckerChange" v-model="radioVal"></vm-checker-group>
            </vm-form-row>

    </vm-page>
</template>

<script>
import Source from '../filter.json';
import {Toast} from 'vm';
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
            radioVal: 2018,
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
            console.log('jfkdjfkdsfds', v);
        },

        abc (v) {
            console.log(v);
        }
    },

    methods: {
        onForWard () {
            alert('您点击了ForWard');
        },
        onCheckerChange (...args) {
            console.log(...args);
        },
        onInputinput (...args) {
            console.log(...args);
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