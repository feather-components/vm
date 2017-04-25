
<style>
    .ios-select-widget-box header.iosselect-header{
        background-color:#fff;
    }
    .ios-select-widget-box ul{
        background-color: transparent;
    }
    .ios-select-widget-box ul li{
        background-color: transparent;
    }
    .ios-select-widget-box ul li.at{
        /*background-color: #fff;*/
        color:#6281C2;
    }
    .ios-select-widget-box .cover-area1,.ios-select-widget-box .cover-area2{
        border:0;
    }
    .ios-select-widget-box header.iosselect-header a.sure{
        color:#6281C2;
        font-size:14px;
    }
    .ios-select-widget-box header.iosselect-header a.close{
        color:#222222;
        font-size:14px;
    }
</style>

<template>
    <div></div>
</template>

<script>

    import Vue from 'vue';
    import IScroll from 'iscroll';
    import IosSelect from 'iosSelect';

    const  DAYS_ONE=31,
            DAYS_TWO=30,
            DAYS_THREE=29,
            DAYS_FOUR=28;

    export default{

        props:{
            initYear:{
                type:Number,
                default:0
            },

            initMonth:{
                type:Number,
                default:()=>{
                    return new Date().getMonth()+1
                }
            },

            initDay:{
                type:Number,
                default:()=>{
                    return new Date().getDate()
                }
            }
        },

        data(){
            return{
                $ele:"",
                yearArgs:[],
                monthArgs:[],
                dayArgs:[],
                iosSelect:""
            }
        },

        computed:{
            year(){
                return this.initYear
            },
            month(){
                return this.initMonth
            },
            day(){
                return this.initDay
            }
        },

        methods:{
            createDatepicker(){
                var _$=this;
                // 数据初始化
                function formatYear(nowYear) {
                    var arr = [];

                    for (var i = nowYear - 5; i <= nowYear + 5; i++) {
                        arr.push({
                            id: i + '',
                            value: i + '年'
                        });
                    }
                    return arr;
                }

                function formatMonth() {
                    var arr = [];
                    for (var i = 1; i <= 12; i++) {
                        arr.push({
                            id: i + '',
                            value: i + '月'
                        });
                    }
                    return arr;
                }

                function formatDate(count) {
                    var arr = [];
                    for (var i = 1; i <= count; i++) {
                        arr.push({
                            id: i + '',
                            value: i + '日'
                        });
                    }
                    return arr;
                }

                var yearData = function (callback) {
                    callback(formatYear(_$.year))
                };

                var monthData = function (year, callback) {
                    callback(formatMonth());
                };

                var dateData = function (year, month, callback) {
                    if (/^(1|3|5|7|8|10|12)$/.test(month)) {
                        callback(formatDate(DAYS_ONE));
                    }
                    else if (/^(4|6|9|11)$/.test(month)) {
                        callback(formatDate(DAYS_TWO));
                    }
                    else if (/^2$/.test(month)) {
                        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                            callback(formatDate(DAYS_THREE));
                        }
                        else {
                            callback(formatDate(DAYS_FOUR));
                        }
                    }
                    else {
                        throw new Error('month is illegal');
                    }
                };
                _$.iosSelect = new IosSelect(3,
                        [yearData, monthData, dateData],
                        {
                            title: '',
                            itemHeight: 35,
                            relation: [1, 1],
                            oneLevelId: _$.year,
                            twoLevelId: _$.month,
                            threeLevelId: _$.day,
                            itemShowCount: 5,
                            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                                _$.$emit("select", selectOneObj, selectTwoObj, selectThreeObj);
                            }
                        });

                _$.iosSelect.closeBtnDom.addEventListener("click", ()=> {
                    _$.$emit("cancel");
                });
            }
        },

    }



</script>

<style>
    .ios-select-widget-box header.iosselect-header{
        background-color:#fff;
    }
    .ios-select-widget-box ul{
        background-color: transparent;
    }
    .ios-select-widget-box ul li{
        background-color: transparent;
    }
    .ios-select-widget-box ul li.at{
        /*background-color: #fff;*/
        color:#6281C2;
    }
    .ios-select-widget-box .cover-area1,.ios-select-widget-box .cover-area2{
        border:0;
    }
    .ios-select-widget-box header.iosselect-header a.sure{
        color:#6281C2;
        font-size:14px;
    }
    .ios-select-widget-box header.iosselect-header a.close{
        color:#222222;
        font-size:14px;
    }
</style>

<template>
    <div></div>
</template>

<script>

    import Vue from 'vue';
    import IScroll from 'iscroll';
    import IosSelect from 'iosSelect';

    const  DAYS_ONE=31,
            DAYS_TWO=30,
            DAYS_THREE=29,
            DAYS_FOUR=28;

    export default{

        props:{
            initYear:{
                type:Number,
                default:0
            },

            initMonth:{
                type:Number,
                default:()=>{
                    return new Date().getMonth()+1
                }
            },

            initDay:{
                type:Number,
                default:()=>{
                    return new Date().getDate()
                }
            }
        },

        data(){
            return{
                $ele:"",
                yearArgs:[],
                monthArgs:[],
                dayArgs:[],
                iosSelect:""
            }
        },

        computed:{
            year(){
                return this.initYear
            },
            month(){
                return this.initMonth
            },
            day(){
                return this.initDay
            }
        },

        methods:{
            createDatepicker(){
                var _$=this;
                // 数据初始化
                function formatYear(nowYear) {
                    var arr = [];

                    for (var i = nowYear - 5; i <= nowYear + 5; i++) {
                        arr.push({
                            id: i + '',
                            value: i + '年'
                        });
                    }
                    return arr;
                }

                function formatMonth() {
                    var arr = [];
                    for (var i = 1; i <= 12; i++) {
                        arr.push({
                            id: i + '',
                            value: i + '月'
                        });
                    }
                    return arr;
                }

                function formatDate(count) {
                    var arr = [];
                    for (var i = 1; i <= count; i++) {
                        arr.push({
                            id: i + '',
                            value: i + '日'
                        });
                    }
                    return arr;
                }

                var yearData = function (callback) {
                    callback(formatYear(_$.year))
                };

                var monthData = function (year, callback) {
                    callback(formatMonth());
                };

                var dateData = function (year, month, callback) {
                    if (/^(1|3|5|7|8|10|12)$/.test(month)) {
                        callback(formatDate(DAYS_ONE));
                    }
                    else if (/^(4|6|9|11)$/.test(month)) {
                        callback(formatDate(DAYS_TWO));
                    }
                    else if (/^2$/.test(month)) {
                        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                            callback(formatDate(DAYS_THREE));
                        }
                        else {
                            callback(formatDate(DAYS_FOUR));
                        }
                    }
                    else {
                        throw new Error('month is illegal');
                    }
                };
                _$.iosSelect = new IosSelect(3,
                        [yearData, monthData, dateData],
                        {
                            title: '',
                            itemHeight: 35,
                            relation: [1, 1],
                            oneLevelId: _$.year,
                            twoLevelId: _$.month,
                            threeLevelId: _$.day,
                            itemShowCount: 5,
                            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                                _$.$emit("select", selectOneObj, selectTwoObj, selectThreeObj);
                            }
                        });

                _$.iosSelect.closeBtnDom.addEventListener("click", ()=> {
                    _$.$emit("cancel");
                });
            }
        },

    }



</script>
