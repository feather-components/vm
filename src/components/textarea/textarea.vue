<template>
    <textarea 
        :placeholder="placeholder"
        :readonly="readonly"
        :autofocus="autofocus"
        class="vm-textarea needsclick"
        @input="onInput"
    >
    </textarea>
</template>

<script>
import Mixins from '../../mixins/input';
import {Util} from '../../helper';

export default {
    name: 'textarea',

    mixins: [Mixins],

    methods: {
        onInput: function (e) {
            const el = e.target;
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px';
        }
    }
};
</script>

<style lang="less">
.vm-textarea {
    font-size: 14px;
    resize: none;
    color: #333;
    font-weight: 300;
    flex: 1;
    padding: 5px 0px;
    outline: none;
    overflow: hidden;
    display: block;
    box-sizing: border-box;
    min-height: 40px;
    border: 0px;

    &::-webkit-input-placeholder {
        font-weight: 300;
        opacity: 0.7;
    }
}
</style>