<template>
    <popup :visible="visibility" :click-bg2hide="clickBg2hide" position="bottom" class="vm-actionsheet" @click.native="hide">
        <div class="vm-actionsheet-items">
            <slot>
                <template v-if="actions">
                    <item
                        v-for="(action, key) of actions"
                        :key="key"
                        @click="action.handler"
                        :disabled="action.disabled"
                        :extras="action.extras"
                    >
                        {{action.title}}
                    </item>
                </template>
            </slot>
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
        },

        actions: {
            type: Array,
            default: null
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