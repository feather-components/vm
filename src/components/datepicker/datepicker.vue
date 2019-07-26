<template>
    <iosselect :visible="visibility" :source="source" @select="onSelect" @confirm="onConfirm" v-model="vals" @close="close" />
</template>
<script>
import Iosselect from '../iosselect';
import Overlay from '../overlay';

export default {
    mixins: [Overlay],

    props: {
        minDate: {
            type: [String, Date],
            default: '1970-01-01'
        },

        maxDate: {
            type: [String, Date],
            default () {
                return new Date();
            }
        },

        format: {
            type: String,
            default: 'yyyy/mm/dd'
        },

        formatter: {
            type: String,
            default () {
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

    data () {
        return {
            months: [],
            days: [],
            hours: 24,
            minutes: 60,
            vals: this.analyseValue(this.value),
            val: ''
        };
    },

    watch: {
        val (v) {
            this.vals = this.analyseValue(v);
            this.$emit('input', v);
        },

        value (v) {
            v != this.val && (this.val = v);
        }
    },

    components: {Iosselect},

    computed: {
        startDate () {
            return this.makeDate(this.minDate);
        },

        endDate () {
            return this.makeDate(this.maxDate);
        },

        minYear () {
            return this.startDate.getFullYear();
        },

        maxYear () {
            return this.endDate.getFullYear();
        },

        years () {
            let minYear = this.minYear;

            let maxYear = this.maxYear;

            let years = [];

            while (minYear <= maxYear) {
                years.push({label: minYear, value: minYear++});
            }
            return years;
        },

        hh () {
            return this.setHMTime(this.hours);
        },

        ii () {
            return this.setHMTime(this.minutes);
        },

        source () {
            return this.setSource();
        }
    },

    methods: {
        setSource () {
            if (this.formatter.indexOf('hh:ii') > -1) {
                return [this.years, this.months, this.days, this.hh, this.ii];
            }

            return [this.years, this.months, this.days];
        },

        setHMTime (num) {
            let hm = [];

            for (let i = 0; i < num; i++) {
                hm.push({label: i < 10 ? `0${i}` : i, value: i < 10 ? `0${i}` : i});
            }
            return hm;
        },

        makeDate (date) {
            return typeof date == 'string' ? new Date(date.replace(/-/g, '/')) : date;
        },

        onSelect (vals) {
            console.log(vals);
            let year = vals[0].value;

            if (vals.length == 1) {
                let min = 0;

                let max = 11;

                let months = [];

                if (year == this.minYear) {
                    min = this.startDate.getMonth();
                }

                if (year == this.maxYear) {
                    max = this.endDate.getMonth();
                }

                while (min <= max) {
                    months.push({label: min + 1, value: ++min});
                }

                this.months = months;
            } else if (vals.length == 2) {
                let min = 1;

                let max = 31;

                let days = [];

                let month = vals[1].value;

                if (year == this.minYear && month == this.startDate.getMonth() + 1) {
                    min = this.startDate.getDate();
                }

                if (year == this.maxYear && month == this.endDate.getMonth() + 1) {
                    max = this.endDate.getDate();
                } else {
                    max = (new Date(year, month, 0)).getDate();
                }

                while (min <= max) {
                    days.push({label: min, value: min++});
                }

                this.days = days;
            } else if (vals.length == 4) {
                let min = 0;

                let max = 24;

                let month = vals[1].value;

                let day = vals[2].value;

                if (year == this.maxYear &&
                        month == this.endDate.getMonth() + 1 &&
                        day == this.endDate.getDate()
                ) {
                    this.hours = this.endDate.getHours() + 1;
                } else {
                    this.hours = max;
                }
            } else if (vals.length == 5) {
                let min = 0;

                let max = 60;

                let month = vals[1].value;

                let day = vals[2].value;

                let hours = vals[3].value;

                if (year == this.maxYear &&
                        month == this.endDate.getMonth() + 1 &&
                        day == this.endDate.getDate() &&
                        hours == this.endDate.getHours()
                ) {
                    this.minutes = this.endDate.getMinutes() + 1;
                } else {
                    this.minutes = max;
                }
            }
        },

        onConfirm (vals) {
            let [year, month, day, hh, ii] = vals;

            let str = this.formatter
                .replace('yyyy', year)
                .replace('yy', year % 100)
                .replace('mm', month < 10 ? '0' + month : month)
                .replace('dd', day < 10 ? '0' + day : day)
                .replace('hh', hh)
                .replace('ii', ii);

            this.val = str;
            this.$emit('confirm', str, vals);
        },

        analyseValue (val = '') {
            let arr = [];

            let types = [/yyyy/.test(this.formatter) ? 'yyyy' : 'yy', 'mm', 'dd', 'hh', 'ii'];

            arr = types.map((type) => {
                let i = this.formatter.indexOf(type);

                return i > -1 ? Number(val.substr(i, type.length)) : '';
            });

            return arr;
        }
    }
};
</script>