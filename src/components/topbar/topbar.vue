<template>
    <div class="vm-topbar" :style="style">
        <div class="vm-topbar-inner">
            <div class="vm-topbar-left" v-if="leftEnabled">
                <slot name="left">
                    <icon type="left" @click.native="onBackButtonClick" />
                </slot>
            </div>

            <div class="vm-topbar-title">
                <slot>页面标题</slot>
            </div>

            <div class="vm-topbar-right" v-if="rightEnabled">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../icon';
import Config from '../../config';

export default {
    name: 'topbar',

    props: {
        leftEnabled: {
            type: Boolean,
            default: true
        },

        rightEnabled: {
            type: Boolean,
            default: true
        }
    },

    components: {
        Icon
    },

    data () {
        return {
            style: {
                'padding-top': Config('topbar.padding-top'),
                'border-bottom': Config('topbar.border-bottom'),
                'background': Config('topbar.background'),
                'color': Config('topbar.color'),
                'font-size': Config('topbar.font-size')
            }
        };
    },

    methods: {
        onBackButtonClick () {
            history.back();
            this.$emit('back');
        }
    }
};
</script>

<style lang="less">
.vm-topbar {
    height: 44px;
    padding: 0px 16px;
}

.vm-topbar-inner {
    position: relative;
    height: 44px;
}

.vm-topbar-left,
.vm-topbar-right {
    min-width: 44px;
    height: 44px;
    display: inline-block;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0px;
    font-weight: bold;
}

.vm-topbar-left {
    left: 0px;
    text-align: left;
}

.vm-topbar-right {
    right: 0px;
    text-align: right;
}

.vm-topbar-title {
    font-weight: bold;
    align-items: center;
    height: 44px;
    display: flex;
    justify-content: center;
}
</style>