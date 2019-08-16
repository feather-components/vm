<template>
    <div :class="classes" :style="styles" @click="onClick">
        <div class="vm-switch-inner">
            <div class="vm-switch-ball"></div>
        </div>
    </div>
</template>

<script>
import {Util} from '../../helper';
import Config from '../../config';

export default {
    name: 'switch',

    model: {
        prop: 'checked',
        event: 'change'
    },

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        color: {
            type: String,
            default () {
                return Config('theme') || Config('switch.color');
            }
        },

        checked: {
            type: Boolean,
            default: false
        }
    }, 

    data () {
        return {
            selected: this.checked
        };
    },

    watch: {
        checked (checked) {
            this.selected = checked;
        }
    },

    computed: {
        styles () {
            return {
                background: this.selected ? this.color : '#fff'
            };
        },

        classes () {
            return [
                'vm-switch', 
                this.selected ? 'vm-switch-checked' : '',
                this.disabled ? 'vm-switch-disabled' : ''
            ];
        }
    },

    methods: {
        onClick () {
            if (this.disabled) return false;

            this.$emit('change', this.selected = !this.selected);
        }
    }
};
</script>

<style lang="less">
.vm-switch {
    box-shadow: inset 0px 0px 1px 1px #eee;
    display: inline-block;
    width: 50px;
    height: 30px;
    position: relative;
    border-radius: 100px;
    transition: background .15s ease;
}

.vm-switch-disabled {
    opacity: 0.7;
}

.vm-switch-inner {
    background: #fff;
    position: absolute;
    right: 2px;
    top: 2px;
    height: 26px;
    transition: all .15s ease;
    border-radius: 100px;
    width: 48px;
}

.vm-switch-checked .vm-switch-inner {
    width: 26px;
}

.vm-switch-ball {
    box-shadow:-2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 100px;
    width: 26px;
    height: 26px;
}

.vm-switch-checked .vm-switch-ball {
    box-shadow: none;
}
</style>