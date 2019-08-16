<template>
    <div @click="onClick" class="vm-checker vm-icon-checker">
        <i 
            class="vm-icon-checker-icon" 
            :style="checkerStyle"
        >
            <icon type="selected" :size="iconSize" color="#fff" class="vm-icon-checker-tick" />
        </i>  

        <div>
            <slot>
                {{label}}
            </slot>
        </div>
    </div>
</template>

<script>
import CheckerAbstract from './abstract';
import Config from '../../config';
import Icon from '../icon';
import {Util} from '../../helper';

export default {
    name: 'icon-checker',

    mixins: [CheckerAbstract],

    components: {
        Icon
    },

    props: {
        iconSize: {
            type: [String, Number],
            default () {
                return Config('checker.icon-size');
            }
        }
    },

    computed: {
        checkerStyle () {
            const size = Util.n2p(this.iconSize);

            return {
                borderRadius: this.square ? Config('checker.square-radius') : '100px',
                width: size,
                height: size,
                borderColor: this.disabled ? '#ccc' : (this.selected ? this.highColor : '#999'),
                background: this.disabled ? '#ccc' : (this.selected ? this.highColor : '#fff') 
            };
        }
    }
};
</script>

<style lang="less">
.vm-icon-checker {
    display: flex;
    align-items: center;

    input {
        display: none;
    }
}

.vm-icon-checker-icon {
    border-width: 1px;
    border-style: solid;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
}

.vm-icon-checker-tick {
    transform: scale(0.7);
    font-weight: bold;
}
</style>