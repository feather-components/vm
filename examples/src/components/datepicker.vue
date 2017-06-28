<template>
    <page>
        <topbar slot="header">iosselect组件</topbar>
        <div class="datepicker">
            <datepicker @on-sure="onSure" connect="-" :inputStyle="style" placeholder="请选择时间"></datepicker>
        </div>
    </page>
</template>
<style>
    .datepicker{
        width:100%;
    }
</style>


<script>
    import {
            Page,
            Topbar,
            Datepicker
    } from 'vmui';

    const style = {
        width: '100%',
        border: 0,
        lineHeight: '44px'
    }

    export default{
        data () {
            return {
                style: style
            }
        },

        components: {
            Page,
            Topbar,
            Datepicker
        },

        methods: {
            onSure(val) {
                console.log(val, '发发发')
            }
        }
    }
</script>