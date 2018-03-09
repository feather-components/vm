<template>
    <iosselect :visible="visibility" :source="[years, months, days]" @select="onSelect" @confirm="onConfirm" v-model="vals" @close="close" />
</template>
<script>
    import Iosselect from '../iosselect';
    import Overlay from '../overlay';

    export default{
        mixins: [Overlay],

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
                default(){
                    return this.format;
                }
            },

            value: {
                type: String,
                default: ''
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
                vals: this.analyseValue(this.value),
                val: ''
            };
        },

        watch: {
            val(v){
                this.vals = this.analyseValue(v);
                this.$emit('input', v);
            },

            value(v){
                v != this.val && (this.val = v);
            }
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
                        max = this.endDate.getMonth();
                    }

                    while(min <= max){
                        months.push({label: min + 1, value: ++min});
                    }

                    this.months = months;
                }else if(vals.length == 2){
                    let min = 1, max = 31, days = [], month = vals[1].value;

                    if(year == this.minYear && month == this.startDate.getMonth() + 1){
                        min = this.startDate.getDate();
                    }

                    if(year == this.maxYear && month == this.endDate.getMonth() + 1){
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
                let str = this.formatter
                            .replace('yyyy', year)
                            .replace('yy', year % 100)
                            .replace('mm', month < 10 ? '0' + month : month)
                            .replace('dd', day < 10 ? '0' + day : day);

                this.val = str;
                this.$emit('confirm', str);
            },

            analyseValue(val = ''){
                let arr = [], types = [/yyyy/.test(this.formatter) ? 'yyyy' : 'yy', 'mm', 'dd'];

                arr = types.map((type) => {
                    let i = this.formatter.indexOf(type);
                    return i > -1 ? Number(val.substr(i, type.length)) : '';
                });

                return arr;
            }
        }
    }  
</script>