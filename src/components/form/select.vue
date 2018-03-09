<template>
    <text-input 
        class="vm-form-select" 
        :label="label" 
        :placeholder="placeholder" 
        :readonly="true" 
        :clearable="false" 
        :align="align" 
        @click="onClick"
        :value="selectedLabels"
    >
        <forward />
    </text-input>
</template>

<script>
import TextInput from './text';
import Forward from '../forward';
import IosSelect from '../iosselect';
import {Util} from '../../helper';
import {Multiable} from './abstract';

export default{
    name: 'select',

    mixins: [Multiable, TextInput],

    props: {
        options: {
            type: [Array, String],
            default(){
                return [];
            }
        },

        source: {
            type: [Array, String],
            default(){
                return this.options;
            }
        },

        selectedLabelFormatter: {
            type: Function,
            default(labels){
                return Util.makeArray(labels).join('');
            }
        },

        dataFormatter: {
            type: Function,
            default(v){
                return v;
            }   
        },

        params: {
            type: [Array, Object],
            default(){
                return {}
            }
        }
    },

    components: {
        TextInput,
        Forward
    },

    data(){
        return {
            selectedLabels: ''
        };
    },

    mounted(){
        let $iosselect = this.$iosselect = Util.factory(IosSelect, {
            source: this.source,
            value: this.val,
            dataFormatter: this.dataFormatter,
            params: this.params,
            visible: false
        });

        $iosselect.$on('scroll:ready', () => {
            this.val != null && (this.selectedLabels = this.selectedLabelFormatter($iosselect.getLabels()));
        });

        $iosselect.$on('confirm', (vals, labels) => {
            this.multiable = vals.length > 0;
            this.save(vals, false);
            this.selectedLabels = this.selectedLabelFormatter(labels);
        });
    },

    methods: {
        onClick(){
            this.$iosselect.open();
        }
    },

    deactivated(){
        this.$iosselect.close();
    },

    destroyed(){
        this.$iosselect.destroy();
    }
}
</script>
