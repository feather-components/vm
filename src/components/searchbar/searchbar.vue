<template>
    <form :class="classes" @submit.prevent="onSubmit()" method="javascript:;">
        <slot name="left"></slot>

        <div class="vm-searchbar-helper" :style="innerStyle">
            <div class="vm-searchbar-inner">
                <slot name="inner-left"></slot>

                <div class="vm-searchbar-box">
                    <div class="vm-searchbar-placeholder">
                        <icon type="search" class="vm-searchbar-icon" />
                        <div 
                            class="vm-searchbar-placeholder-text"
                            :style="placeholderStyle"
                        >
                            {{placeholder}}
                        </div>
                    </div>
                    
                    <x-input 
                        class="vm-searchbar-x-input"
                        theme="transparent"
                        :type="searchButtonEnabled ? 'search': 'text'" 
                        :maxlength="maxlength" 
                        v-model="val"
                        ref="input" 
                        @input="onInput"
                        @blur="onBlur"
                        @focus="onFocus"  
                        @click="onClick" 
                        :readonly="readonly" 
                    >
                    </x-input>
                </div>
            </div>
        </div>

        <slot name="right"></slot>
    </form>
</template>

<script>
import Icon from '../icon';
import xInput from '../input';
import Model from '../../mixins/model';
import {Util} from '../../helper';

export default {
    name: 'searchbar',

    mixins: [Model],    

    props: {
        maxlength: {
            type: Number,
            default: 50
        },

        placeholder: {
            type: String,
            default: '请输入关键字'
        },

        readonly: {
            type: Boolean,
            default: false
        },

        searchButtonEnabled: {
            type: Boolean,
            default: false
        },

        innerStyle: {
            type: [String, Object],
            default: null
        }
    },

    components: {
        Icon,
        xInput
    },

    computed: {
        classes () {
            return [
                'vm-searchbar', 
                this.focusing || this.val ? 'vm-searchbar-x' : ''
            ];
        },

        placeholderStyle () {
            return {
                visibility: this.val ? 'hidden' : 'visible'
            };
        }
    },

    data () {
        return {
            focusing: false
        };
    },
    
    methods: {
        focus () {
            this.$refs.input.focus();
        },

        blur () {
            this.$refs.input.blur();
        },

        onFocus () {
            this.focusing = true;
            this.$emit('focus');
        },

        onBlur () {
            this.focusing = false;
            this.$emit('blur');
        },

        onClick () {
            this.$emit('click');
        },

        onInput (v) {
            this.setValue(v);
        },

        onSubmit () {
            this.$emit('submit');
            this.blur();
        },

        setValue (v) {
            this.val = v.trim();
        }
    }
};
</script>

<style lang="less">
.vm-searchbar {
    padding: 0px 16px;
    height: 46px;
    display: flex;
    align-items: center;
    margin: 0px;
    box-sizing: border-box;
    width: 100%;

    ::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
}

.vm-searchbar-helper {
    height: 36px;
    box-sizing: border-box;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: 14px;
    border-radius: 100px;
}

.vm-searchbar-inner {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.vm-searchbar-box {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}

.vm-searchbar-placeholder {
    display: flex;
    opacity: 0.7;
    transition: opacity .3s ease;
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    top: 0px;
    left: 0px;
}

.vm-searchbar-placeholder-text {
    transition: flex .3s ease;
    flex-shrink: 1;
    opacity: 0.7;
}

.vm-searchbar-x .vm-searchbar-placeholder {
    opacity: 1;

    .vm-searchbar-placeholder-icon {
        font-weight: bold;
    }

    .vm-searchbar-placeholder-text {
        flex-grow: 1;

    }
}

.vm-searchbar-x-input {
    margin-right: 10px;
    position: relative;
    z-index: 1;
    margin-left: 25px;
}

.vm-searchbar-icon {
    width: 15px;
    flex-shrink: 0;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: bold;
}
</style>