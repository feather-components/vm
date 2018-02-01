<template>
    <iosselect :visible="visibility" :source="[years, months, days]" @select="onSelect" @confirm="onConfirm" @close="close" />
</template>
<script>
    import Iosselect from '../iosselect';

    export default{
        mixins: [Iosselect],

        props: {
            minDate: {
                type: [String, Date],
                default: '1970-01-01'
            },

            maxDate: {
                type: [String, Date],
                default(){
                    return new Date;
                }
            },

            format: {
                type: String,
                default: 'yyyy/mm/dd'
            },

            formatter: {
                type: String,
                default: null
            },

            value: {
                type: String,
                default(){}
            },

            visible: {
                type: Boolean,
                default: true
            }
        },

        data(){
            return {
                months: [],
                days: [],
                val: ''
            };
        },

        components: {Iosselect},

        computed: {
            startDate(){
                return this.makeDate(this.minDate);
            },

            endDate(){
                return this.makeDate(this.maxDate);
            },

            minYear(){
                return this.startDate.getFullYear();
            },

            maxYear(){
                return this.endDate.getFullYear();
            },

            years(){
                let minYear = this.minYear, maxYear = this.maxYear;
                let years = [];

                while(minYear <= maxYear){
                    years.push({label: minYear, value: minYear++});
                }

                return years;
            }
        },

        methods: {
            makeDate(date){
                return typeof date == 'string' ? new Date(date) : date;
            },

            onSelect(vals){
                let year = vals[0].value;

                if(vals.length == 1){   
                    let min = 0, max = 11, months = [];

                    if(year == this.minYear){
                        min = this.startDate.getMonth();
                    }

                    if(year == this.maxYear){
                        max = this.startDate.getMonth();
                    }

                    while(min <= max){
                        months.push({label: min + 1, value: min++});
                    }

                    this.months = months;
                }else if(vals.length == 2){
                    let min = 1, max = 31, days = [], month = vals[1].value;

                    if(year == this.minYear && month == this.startDate.getMonth()){
                        min = this.startDate.getDate();
                    }

                    if(year == this.maxYear && month == this.endDate.getMonth()){
                        max = this.endDate.getDate();
                    }else{
                        max = (new Date(year, month + 1, 0)).getDate();
                    }

                    while(min <= max){
                        days.push({label: min, value: min++});
                    }

                    this.days = days;
                }
            },

            onConfirm(vals){
                let [year, month, day] = vals;

                month = month + 1;

                let str = (this.formatter || this.format)
                            .replace('yyyy', year)
                            .replace('yy', year % 100)
                            .replace('mm', month < 10 ? '0' + month : month)
                            .replace('dd', day < 10 ? '0' + day : day);

                this.val = str;
                this.$emit('input', this.val);
                this.$emit('confirm', this.val);
            }
        }
    }  
</script>