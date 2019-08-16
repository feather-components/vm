<template>
    <div :class="classes">
        <div class="vm-form-row-inner">
            <div class="vm-form-row-main">
                <div class="vm-form-label" v-if="$slots.label || label" :style="labelStyle">
                    <slot name="label">{{label}}</slot>

                    <span v-if="$slots.tips" class="vm-form-tips">
                        <slot name="tips"></slot>
                    </span>
                </div>

                <div class="vm-form-row-fill">
                    <slot></slot>
                </div>
            </div>

            <div class="vm-form-row-extras">
                <slot name="extras"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import {Util} from '../../helper';
import Config from '../../config';

export default {
    name: 'form-row',

    provide () {
        return {
            rowAlign: this.align
        };
    },

    props: {
        label: null,

        align: {
            type: String,
            defualt: 'left'
        },

        verticalLayout: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            layout: this.verticalLayout || this.$slots.tips ? 'vertical' : 'horizontal',
            labelStyle: {
                minWidth: Config('form-row.label-min-width')
            }
        };
    },

    computed: {
        classes () {
            return `vm-form-row vm-form-row-${this.layout} vm-form-row-${this.align}`;
        }
    }
};
</script>

<style lang="less">
.vm-form-row {
    padding-left: 12px;
}

.vm-form-row-inner {
    padding: 6px 12px 6px 0px;
    border-bottom: 1px solid #eee;
}

.vm-form-row:nth-last-child(1) {
	.vm-form-row-inner {
		border-bottom: 0px;
	}
}

.vm-form-label {
    display: flex;
    align-items: center;
}

.vm-form-row-horizontal {
    .vm-form-row-main {
        min-height: 30px;
        display: flex;
    }

    .vm-form-label {
        height: 30px;
    }
}

.vm-form-row-right {
    .vm-form-row-fill {
        justify-content: flex-end;
    }
}

.vm-form-tips {
    color: #aaa;
    margin-start: auto;
    -webkit-margin-start: auto;
    font-size: 12px;
}

.vm-form-row-fill {
    padding-left: 12px;
    display: flex;
    align-items: center;
    flex: 1;
}

.vm-form-row-vertical {
    .vm-form-row-fill {
        padding-left: 0px;
    }

    .vm-form-label {
        margin-bottom: 6px;
    }
}
</style>