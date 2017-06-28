<template>
    <page>
        <topbar slot="header">iosselect组件</topbar>
        <datepicker @on-sure="onSure" connect="-"></datepicker>
    </page>
</template>


<script>
    import {
            Page,
            Topbar,
            Datepicker
    } from 'vmui';

    const selectList = [
        [
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
            {label: '5', value: 5},
            {label: '6', value: 6},
            {label: '7', value: 7},
            {label: '8', value: 8},
            {label: '9', value: 9},
            {label: '10', value: 10},
            {label: '11', value: 11},
            {label: '11', value: 11}
        ],
        [
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
            {label: '5', value: 5},
            {label: '6', value: 6},
            {label: '7', value: 7},
            {label: '8', value: 8},
            {label: '9', value: 8},
            {label: '10', value: 10},
            {label: '12', value: 12},
            {label: '13', value: 13},
            {label: '14', value: 14}
        ]
    ];

    export default{
        data () {
            return {
                selectList: selectList
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