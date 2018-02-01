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

    mixins: [Single, TextInput, Datepicker],

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
                    formatter: this.format || this.formatter
                });

                this.$$datepicker.$on('confirm', (val) => {
                    this.val = val;
                });
            }

            return this.$$datepicker;
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
