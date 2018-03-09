<template>
    <text-input
        class="vm-form-date" 
        :label="label" 
        :placeholder="placeholder" 
        :readonly="true" 
        :clearable="false" 
        :align="align" 
        @click="onClick"
        v-model="val"
    >
        <forward />
    </text-input>
</template>

<script>
import TextInput from './text';
import Forward from '../forward';
import Datepicker from '../datepicker';
import {Util} from '../../helper';
import {Single} from './abstract';

export default{
    name: 'dateinput',

    mixins: [TextInput],

    props: {
        minDate: {
            default: '1970/01/01'
        },

        maxDate: {
            default(){
                return new Date;
            }
        },
        
        formatter: {
            default: 'yyyy/mm/dd'
        }
    },

    components: {
        TextInput,
        Forward
    },

    computed: {
        $datepicker(){
            if(!this.$$datepicker){
                this.$$datepicker = Util.factory(Datepicker, {
                    minDate: this.minDate,
                    maxDate: this.maxDate,
                    value: this.val,
                    visible: true,
                    formatter: this.formatter
                });
                this.$$datepicker.close();
                this.$$datepicker.$on('confirm', (val) => {
                    this.$emit('confirm', this.val = val);
                });

                this.$$datepicker.$on('open', () => {
                    this.$$datepicker.val = this.val;
                });
            }

            return this.$$datepicker;
        }
    },

    watch: {
        value(v){
            this.$datepicker.val = v;
        }
    },

    methods: {
        onClick(){
            this.$datepicker.open();
        }
    },

    deactivated(){
        this.$datepicker.close();
    },

    destroyed(){
        this.$datepicker.destroy();
    }
}
</script>
