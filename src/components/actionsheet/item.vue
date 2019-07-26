<template>
    <a 
        href="javascript:" 
        :class="['vm-actionsheet-item', disabled ? 'vm-actionsheet-item-disabled' : '']" 
        @click="onClick"
    >
        <slot></slot>
        <span v-if="extras" v-html="extras" class="vm-actionsheet-item-extras"></span>
    </a>
</template>

<script>
export default {
    name: 'actionsheet-item',

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        extras: {
            type: String,
            default: null
        }
    },

    methods: {
        onClick () {
            if (this.disabled) return false;
            
            this.$emit('click');
        }
    }
};
</script>

<style>
.vm-actionsheet-item {
    text-decoration: none;
    background: #fff;
    font-weight: bold;
    padding: 10px 0px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 16px;
    color: #222222;
    border-top: 1px solid #eee;
}

.vm-actionsheet-item:nth-child(1) {
    border-top: 0px;
}

.vm-actionsheet-item-disabled {
    color: #ccc;
}

.vm-actionsheet-item-extras {
    font-size: 12px;
    color: #666;
    font-weight: normal;
    margin-top: 5px;
}
</style>