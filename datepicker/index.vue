
<style>

</style>

<template>
    <div >
        <div class="pc-box">
            <span data-year="" data-month="" data-date="" id="showDate">点击这里选择时间</span>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import IScroll from 'iscroll';
    import IosSelect from 'iosSelect';

    const   DAYS_ONE=31,
            DAYS_TWO=30,
            DAYS_THREE=29,
            DAYS_FOUR=28;

    export default{
        name:"datepicker",

        props:{

        },

        data(){
            return{
                $ele:"",
                year:"",
                month:"",
                day:"",
                yearArgs:[],
                monthArgs:[],
                dayArgs:[],
            }
        },

        computed:{

        },

        created(){
            var _$=this;
            new Promise((resolve,reject)=>{resolve()}).then(()=>{

                var now = new Date();
                var nowYear = now.getFullYear();
                var nowMonth = now.getMonth() + 1;
                var nowDate = now.getDate();

                // 数据初始化
                function formatYear (nowYear) {
                    var arr = [];
                    for (var i = nowYear - 5; i <= nowYear + 5; i++) {
                        arr.push({
                            id: i + '',
                            value: i + '年'
                        });
                    }
                    return arr;
                }

                function formatMonth () {
                    var arr = [];
                    for (var i = 1; i <= 12; i++) {
                        arr.push({
                            id: i + '',
                            value: i + '月'
                        });
                    }
                    return arr;
                }

                function formatDate (count) {
                    var arr = [];
                    for (var i = 1; i <= count; i++) {
                        arr.push({
                            id: i + '',
                            value: i + '日'
                        });
                    }
                    return arr;
                }

                var yearData = function(callback) {
                    callback(formatYear(nowYear))
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
                        if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
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

                var iosSelect = new IosSelect(3,
                        [yearData, monthData, dateData],
                        {
                            title: '日期选择',
                            itemHeight: 35,
                            relation: [1, 1],
                            oneLevelId: nowYear,
                            twoLevelId: nowMonth,
                            threeLevelId: nowDate,
                            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {

                            }
                        });


            })


        },

        watch:{

        },

        methods:{

        },



    }

</script>