<template>
    <i :class="'vm-icon-' + name" class="vm-iconfont" :style="{fontSize: size + 'rem'}"></i>
</template>

<script>
    import './iconfont.css';

    export default {
        name: 'icon',

        props: {
            name: {
                type: String,
                default: ''
            },

            size: {
                type: Number,
                default: .16
            }
        }
    }
</script>