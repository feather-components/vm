import Picker from './picker';
import Overlay from '../overlay';
import Model from '../../mixins/model';
import Config from '../../config';
import {Util} from '../../helper';

const HOURS = 23, MINUTES = 59;

let TimePicker = {
    name: 'timepicker',

    mixins: [Overlay, Model],

    props: {
        units: {
            type: Array,
            default () {
                return Config('timepicker.units');
            }
        },
    },

    data () {
        return {
            options: [
                TimePicker.lv(HOURS, 0, this.units[0]), 
                TimePicker.lv(MINUTES, this.units[1])
            ],
            vals: this.analyseValue(this.value)
        };
    },

    methods: {
        onConfirm (vals) {
            this.vals = vals;
            this.$emit('confirm', this.val = vals.join(':'));
        },

        setValue (value) {
            this.analyseValue(this.val = value);
        },

        analyseValue (value) {
            return (value || '').split(':');
        }
    },

    render (h) {
        return h(
            Picker,
            {
                props: {
                    options: this.options,
                    visible: this.visibility,
                    value: this.vals
                },

                on: {
                    hide: this.hide,
                    confirm: this.onConfirm
                }
            }
        );
    }
};

TimePicker.lv = (end, start = 0, unit = '') => {
    let arr = [];

    for (let i = start; i <= end; i++) {
        let label = Util.pad(i) + unit;

        arr.push({
            label,
            value: i
        });
    };

    return arr;
};

export default TimePicker;