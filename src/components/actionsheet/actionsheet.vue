<template>
    <popup :visible="visibility" :click-bg2hide="clickBg2hide" position="bottom" class="vm-actionsheet" @click="hide">
        <div class="vm-actionsheet-items">
            <slot></slot>
        </div>

        <div class="vm-actionsheet-cancel" v-if="!cancelDisabled">
            <slot name="cancel">
                <item @click="hide">取消</item>
            </slot>
        </div>
    </popup>
</template>

<script>
import Popup from '../popup';
import Item from './item';

export default {
    name: 'actionsheet',

    mixins: [Popup],

    props: {
        cancelDisabled: {
            type: Boolean,
            default: false
        },

        clickBg2hide: {
            type: Boolean,
            default: true
        }
    },

    components: {
        Popup,
        Item
    }
};
</script>

<style lang="less">
.vm-actionsheet-items, .vm-actionsheet-cancel {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
}
</style>