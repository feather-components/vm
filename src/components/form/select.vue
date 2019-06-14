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
        <template slot="label" v-if="$slots.label">
            <slot name="label"></slot>
        </template>
        <forward />
    </text-input>
</template>

<script>
import TextInput from './text';
import Forward from '../forward';
import IosSelect from '../iosselect';
import {Util} from '../../helper';
import {Multiable} from './abstract';

export default {
    name: 'select',

    mixins: [Multiable, TextInput],

    props: {
        options: {
            type: [Array, String],
            default () {
                return [];
            }
        },

        source: {
            type: [Array, String],
            default () {
                return this.options;
            }
        },

        selectedLabelFormatter: {
            type: Function,
            default (labels) {
                return Util.makeArray(labels).join('');
            }
        },

        dataFormatter: {
            type: Function,
            default (v) {
                return v;
            }
        },

        params: {
            type: [Array, Object],
            default () {
                return {};
            }
        }
    },

    components: {
        TextInput,
        Forward
    },

    data () {
        return {
            selectedLabels: ''
        };
    },

    watch: {
        source (v) {
            this.$iosselect.render(v);
        },

        options (v) {
            this.$iosselect.render(v);
        },

        value (v) {
            this.$iosselect.setValue(v);
        }
    },

    mounted () {
        let $iosselect = this.$iosselect = Util.factory(IosSelect, {
            source: this.source,
            value: Util.makeArray(this.val),
            dataFormatter: this.dataFormatter,
            params: this.params,
            visible: false
        });

        let isOpen = false;

        $iosselect.$on('open', () => isOpen = true);
        $iosselect.$on('close', () => isOpen = false);

        $iosselect.$on('select', () => {
            this.val != null && !isOpen && (this.selectedLabels = this.selectedLabelFormatter($iosselect.getLabels()));
        });

        $iosselect.$on('confirm', (vals, labels) => {
            this.multiable = vals.length > 0;
            this.save(vals, false);
            this.selectedLabels = this.selectedLabelFormatter(labels);
            this.$emit('confirm', vals, labels);
        });
    },

    methods: {
        onClick () {
            this.$iosselect.open();
        }
    },

    deactivated () {
        this.$iosselect.close();
    },

    destroyed () {
        this.$iosselect.destroy();
    }
};
</script>