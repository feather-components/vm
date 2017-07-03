<template>
    <page>
        <topbar slot="header">Datepicker组件</topbar>
        <div class="datepicker">
            <!--<input type="text" class="vmui-datepicker" v-model="dateVal" :style="inputStyle" readonly-->
            <!--:placeholder="placeholder" @click="_showDatepicker"-->
            <!--/>-->
            <datepicker @confirm="onSure" :inputStyle="style" placeholder="请选择时间"
                        dateFormat="yy-mm-dd"></datepicker>
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