import Picker from './picker';
import TimePicker from './time';
import Overlay from '../overlay';
import Config from '../../config';
import {Util} from '../../helper';

const MAXS = [12, null, 23, 59];
const FIELDS = ['years', 'months', 'days', 'hours', 'minutes'];

let DatePicker = {
    name: 'datepicker',

    mixins: [TimePicker],

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

        formatter: {
            type: String,
            default: 'yyyy/mm/dd'
        },

        units: {
            type: Array,
            default () {
                return Config('datepicker.units').concat(Config('timepicker.units'));
            }
        }
    },

    computed: {
        startDate () {
            return Util.date(this.minDate);
        },

        endDate () {
            return Util.date(this.maxDate);
        }
    },

    data () {
        return {
            years: [],
            months: [],
            days: [],
            hours: [],
            minutes: []
        };
    },

    mounted () {
        this.columns = DatePicker.columns(this.formatter);
        this.years = TimePicker.lv(
            this.endDate.getFullYear(),
            this.startDate.getFullYear(),
            this.units[0]
        );
        this.mins = DatePicker.serialize(this.startDate);
        this.maxs = DatePicker.serialize(this.endDate);
    },

    methods: {
        onSelect (vals) {
            if (vals.length < this.columns) {
                this[FIELDS[vals.length]] = this.analyse(vals.map((val) => {
                    return val.value;
                }));
            }
        },

        analyse (vals) {
            const l = vals.length;
            const mins = this.mins.slice(0, l);
            const maxs = this.maxs.slice(0, l);
            let f, max, min;

            if (vals.toString() == mins.toString()) {
                min = this.mins[l];
            } else {
                min = l >= 3 ? 0 : 1;
            }

            if (vals.toString() == maxs.toString()) {
                max = this.maxs[l];
            } else if (l == 2) {
                max = (new Date(vals[0], vals[1], 0)).getDate();
            } else {
                max = MAXS[l - 1];
            }

            return TimePicker.lv(max, min, this.units[l]);
        },

        onConfirm (vals) {
            let [year, month, day, hh, ii] = vals;
            let str = this.formatter
                .replace('yyyy', year)
                .replace('yy', year % 100)
                .replace('mm', Util.pad(month))
                .replace('dd', Util.pad(day))
                .replace('hh', Util.pad(hh))
                .replace('ii', Util.pad(ii));

            this.val = str;
            this.$emit('confirm', str, vals);
        },

        analyseValue (date) {
            return DatePicker.serialize(new Date(date)).slice(0, this.columns);
        }
    },

    render (h) {
        let options = [this.years, this.months, this.days, this.hours, this.minutes].slice(0, this.columns);

        return h(
            Picker,
            {
                props: {
                    options,
                    visible: this.visibility,
                    value: this.vals
                },

                on: {
                    hide: this.hide,
                    confirm: this.onConfirm,
                    select: this.onSelect
                }
            }
        );
    }
};

DatePicker.serialize = (date) => {
    return [
        date.getFullYear(), 
        date.getMonth() + 1, 
        date.getDate(),
        date.getHours(),
        date.getMinutes()
    ];
};

DatePicker.columns = (formatter) => {
    if (/hh:ii/.test(formatter)) return 5;
    if (!/dd/.test(formatter)) return 2;
    
    return 3;
};

export default DatePicker;