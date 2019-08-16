<template>
    <div @click="onClick" class="vm-checker vm-btn-checker" :style="checkerStyle">
        <div class="vm-btn-checker-inner" :style="innerStyle">
            <slot>
                {{label}}
            </slot>
        </div>
    </div>
</template>

<script>
import CheckerAbstract from './abstract';
import Config from '../../config';

export default {
    name: 'checker',

    mixins: [CheckerAbstract],

    computed: {
        checkerStyle () {
            const {square, disabled, selected, highColor} = this;

            return {
                borderRadius: square ? Config('checker.square-radius') : '100px',
                borderColor: disabled ? '#ccc' : (selected ? highColor : 'transparent'),
                background: disabled ? '#f8f8f8' : (selected ? highColor : '#f3f6fb'),
                borderStyle: disabled ? 'dashed' : 'solid'
            };
        },

        innerStyle () {
            const {selected, highColor, disabled} = this;

            return {
                color: selected ? highColor : 'inherit',
                opacity: disabled ? 0.7 : 1,
                background: selected ? 'rgba(255, 255, 255, 0.8)' : 'transparent'
            };
        }
    }
};
</script>

<style lang="less">
.vm-btn-checker {
    color: #333;
    display: inline-block;
    border-width: 1px;
    border-style: solid;
    height: 24px;
    overflow: hidden;
    min-width: 50px;

    input {
        display: none;
    }
}

.vm-btn-checker-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 8px;
}
</style>