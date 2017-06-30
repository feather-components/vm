<template>
    <page>
        <topbar slot="header">iosselect组件</topbar>
        <!--<input type="text" v-iosselect="{selectList:selectList,onSure:onSure,loopEvent:loopEvent}" placeholder="请选择"-->
               <!--style="width: 100%;border: 0;line-height: 44px">-->
        <input type="text" @click="showIosselect" v-model="val">
        <!--<text-input label="单行文本" placeholder="单行" v-model="val" @click="showIosselect" />-->

        <iosselect :source="selectList" @confirm="onSure" :visible="show" @close="close"></iosselect>
    </page>
</template>


<script>
    import {
            Page,
            Topbar,
            Iosselect,
            TextInput
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
            {label: '11', value: 11},
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
                selectList: selectList,
                show: false,
                val: ''
            }
        },

        components: {
            Page,
            Topbar,
            Iosselect,
            TextInput
        },

        methods: {
            showIosselect() {
                this.show = true
            },
            close() {
                this.show = false
            },

            onSure(val) {
                console.log(val, '发发')
                this.show = false
                this.val = val[0].label + '-' + val[1].label
            }
        }
    }
</script>