<template>
<div :class="className" v-if="visibility">
    <slot></slot>
</div>
</template>

<script>
export default{
    props: {
        visible: {
            type: Boolean,
            default: false
        },

        position: {
            type: String,
            default: null
        }
    },

    data(){
        return {
            visibility: this.visible
        }
    },

    watch: {
        visible(v){
            v ? this.open() : this.close();
        }
    },

    computed: {
        className(){
            return ('vmui-overlay ' + (this.position ? 'vmui-overlay-' + this.position : '') + (this.class || '')).trim();
        }
    },

    methods: {
        open(){
            this.visibility = true;
            this.$emit('open');
        },

        close(){
            this.visibility = false;
            this.$emit('close');
        }
    }
}
</script>

<style>
.vmui-overlay{
    position: fixed;
    z-index: 10000;
    background: #fff;
}

.vmui-overlay-center{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

.vmui-overlay-left{
    left: 0px;
}

.vmui-overlay-right{
    right: 0px;
}

.vmui-overlay-bottom{
    bottom: 0px;
}

.vmui-overlay-right{
    right: 0px;
}
</style>