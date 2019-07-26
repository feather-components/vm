<template>
    <form class="vm-searchbar" @submit.prevent="onSubmit()" method="javascript:;">
        <div class="vm-searchbar-helper" :style="innerStyle">
            <div class="vm-searchbar-inner">
                <slot name="inner-left"></slot>

                <slot name="icon">
                    <icon type="search" class="vm-searchbar-icon" />
                </slot>
                
                <input 
                    :type="searchButtonEnabled ? 'search': 'text'" 
                    :placeholder="placeholder" 
                    :maxlength="maxlength" 
                    :value="val" 
                    ref="input" 
                    @input="onInput"
                    @focus="onFocus"  
                    @click="onClick" 
                    :readonly="readonly" 
                />

                <a href="javascript:" :class="['vm-searchbar-clear', !val ? 'vm-searchbar-clear-hide' : '']" @click="clear()">
                    <icon type="close" />
                </a>
            </div>
        </div>

        <slot name="right"></slot>
    </form>
</template>

<script>
import Icon from '../icon';
import {Util} from '../../helper';

export default {
    name: 'searchbar',

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

        value: {
            type: String,
            default: ''
        },

        innerStyle: {
            type: [String, Object],
            default: null
        }
    },

    components: {
        Icon
    },

    data () {
        return {
            val: this.value
        };
    },

    watch: {
        val (v) {
            this.$emit('input', v);
        },

        value (v) {
            this.val = v.trim();
        }
    },

    methods: {
        focus () {
            this.$refs.input.focus();
        },

        onFocus () {
            this.$emit('focus');
        },

        onClick () {
            this.$emit('click');
        },

        onInput () {
            this.val = this.$refs.input.value.trim();
        },

        blur () {
            this.$refs.input.blur();
        },

        clear () {
            this.val = '';
            this.$emit('clear');
        },

        onSubmit () {
            this.$emit('submit');
            this.$refs.input.blur();
        }
    }
};
</script>

<style lang="less">
.vm-searchbar {
    padding: 5px 16px;
    height: 36px;
    display: flex;
    align-items: center;
    margin: 0px;

    ::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
}

.vm-searchbar-helper {
    height: 100%;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    flex: 1;
    border-radius: 100px;
}

.vm-searchbar-inner {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;

    input {
        height: 100%;
        flex: 1;
        display: block;
        color: inherit;
        font-size: 14px;
        box-sizing: border-box;
        border: 0px;
        outline: none;
        background: transparent;

        &:focus {
            border: 0px;
        }
    }

    ::-webkit-input-placeholder {
        color: inherit;
        opacity: 0.5;
    }
}

.vm-searchbar-icon {
    display: inline-block;
    margin-left: 6px;
    margin-right: 6px;
    font-weight: bold;
    opacity: 0.8;
}

.vm-searchbar-clear {
    text-decoration: none;
    width: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: inherit;
    font-weight: bold;
    opacity: 0.8;
}

.vm-searchbar-clear-hide {
    visibility: hidden;
}
</style>