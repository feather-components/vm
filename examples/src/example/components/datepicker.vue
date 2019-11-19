<template>
    <vm-page style="background:#f1f1f1;">
        <vm-topbar>DateTime Picker组件</vm-topbar>

        <vm-box style="background:#fff;">
            <vm-row slot="header">Datepicker</vm-row>
            <vm-form-row label="选择时间（日）">
                <div slot="tips">
                    <vm-forward @click="onForward(1)">{{date1}}</vm-forward>
                </div>
            </vm-form-row>

            <vm-form-row label="选择时间（时分）">
                <div slot="tips">
                    <vm-forward @click="onForward(2)">{{date2}}</vm-forward>
                </div>
            </vm-form-row>

            <vm-form-row label="选择时间（月）">
                <div slot="tips">
                    <vm-forward @click="onForward(3)">{{date3}}</vm-forward>
                </div>
            </vm-form-row>
        </vm-box>

        <vm-box style="background:#fff;">
            <vm-row slot="header">Timepicker</vm-row>
            <vm-form-row label="选择时间">
                <div slot="tips">
                    <vm-forward @click="onForward_T(1)">{{date_T}}</vm-forward>
                </div>
            </vm-form-row>
        </vm-box>
        <vm-datepicker v-if="visible" v-model="visible" @confirm="confirm" :formatter="formatter" :value="date" max-date="2020/10/01 02:02" />
        <vm-timepicker v-if="visible_t" v-model="visible_t" @confirm="confirm_T" />

    </vm-page>
</template>

<script>
export default {
    data () {
        return {
            date1: '',
            date2: '',
            date3: '',
            visible: false,
            visible_t: false,
            format1: 'yyyy/mm/dd',
            format2: 'yyyy-mm-dd hh:ii',
            format3: 'yyyy-mm',
            formatter: 'yyyy.mm.dd',
            n: 1,
            date: '2018-02-10',
            date_T: ''
        };
    },
    methods: {
        onForward_T () {
            this.visible_t = !this.visible_t;
        },
        onForward (n) {
            this.n = n;
            this.formatter = this['format' + this.n];

            this.visible = !this.visible;
        },
        confirm (s, v) {
            this['date' + this.n] = s;
            this.date = s;
        },
        confirm_T (s) {
            this.date_T = s;
        },
        onSelect (s) {
            console.log(s);
        }
    }
};
</script>