<template>
    <row>
        <div class="vm-form-cell">
            <div :class="'vm-form-cell-' + layout">
                <div class="vm-form-label" v-if="$slots.label">
                    <slot name="label"></slot>

                    <span v-if="$slots.tips" class="vm-form-tips">
                        <slot name="tips"></slot>
                    </span>
                </div>

                <div class="vm-form-cell-inner">
                    <slot></slot>
                </div>
            </div>

            <div class="vm-form-cell-extras">
                <slot name="extras"></slot>
            </div>
        </div>
    </row>
</template>

<script>
import Row from '../layout/row';

export default {
    name: 'form-cell',

    components: {
        Row
    },

    props: {
        verticalLayout: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            layout: this.verticalLayout || this.$slots.tips ? 'vertical' : 'horizontal'
        };
    }
};
</script>

<style lang="less">
.vm-form-cell {
    color: #555;
}

.vm-form-label {
    display: flex;
    align-items: center;
}

.vm-form-cell-horizontal {
    min-height: 32px;
    display: flex;
    align-items: center;
}

.vm-form-tips {
    color: #aaa;
    margin-start: auto;
    -webkit-margin-start: auto;
    font-size: 12px;
}
</style>