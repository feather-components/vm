<template>
    <div>
        <input type="text" class="vmui-datepicker" v-model="dateVal" :style="inputStyle" readonly
               :placeholder="placeholder" @click="_showDatepicker"
        />
        <iosselect :source="dateList" @confirm="_onSure" :value="selectVal"
                   @change="_setDays($event, 2)" v-if="visibility" @close="_close"></iosselect>
    </div>
</template>
<script>
    import iosselect from '../iosselect'

    let date = new Date();
    const [
        CURRENT_YEAR,
        CURRENT_MONTH,
        CURRENT_DAY
    ] = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate()
    ]

    let getYears = () => {
        let years = [{label: CURRENT_YEAR, value: CURRENT_YEAR}]

        for (let i = 1; i <= 30; i++) {
            let [o1, o2] = [{
                label: CURRENT_YEAR - i,
                value: CURRENT_YEAR - i
            },{
                label: CURRENT_YEAR + i,
                value: CURRENT_YEAR + i
            }]
            years.unshift(o1)
            years.push(o2)
        }

        return years
    }

    let getMonths = () => {
        let months = []
        for (let i = 1; i <= 12; i++) {
            months.push({
                label: i,
                value: i
            })
        }

        return months
    }

    let getDays = (currentYear, currentMonth) => {
        let [end, days] = [0, []]

        if (BIG_MONTHS.indexOf(currentMonth) > -1) {
            end = 31
        } else if (SMALL_MONTHS.indexOf(currentMonth) > -1) {
            end = 30
        } else {
            end = currentYear % 100 === 0 ? (currentYear % 400 === 0 ? 29 : 28 ) : (currentYear % 4 === 0 ? 29 : 28)
        }

        for (let d = 1; d <= end; d++) {
            let o = {
                label: d,
                value: d
            }
            days.push(o)
        }

        return days
    }

    const [
        YEARS,
        MONTHS,
        BIG_MONTHS,
        SMALL_MONTHS,
    ] = [
        getYears(),
        getMonths(),
        [1, 3, 5, 7, 8, 10, 12],
        [4, 6, 9, 11]
    ], DAYS =  getDays(CURRENT_YEAR, CURRENT_MONTH)

    export default {
        props:{
            inputStyle: {
                type: Object
            },

            dateFormat: {
                type: String,
                default: 'yyyy/mm/dd'
            },

            placeholder: {
                type: String,
                default: '请选择时间'
            }
        },

        data() {
            return {
                dateList:[
                    YEARS,
                    MONTHS,
                    DAYS
                ],
                dateVal: '',
                selectVal: [CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY],
                visibility: false
            }
        },

        components: {
            iosselect
        },

        methods: {
            _setDays(e, i) {
                try{
                    let days = getDays(e.val[0].value, e.val[1].value)
                    e.done(days, 2)
                }catch (e) { return }
            },

            _onSure (val) {
                let va = []

                val.forEach((v, k) => {
                    va.push(v.label)
                })

                switch (this.dateFormat) {
                    case 'yyyy-mm-dd':
                        this.dateVal = va.join('-')
                        break;
                    case 'yy-mm-dd':
                        va[0] = va[0].toString().substr(2)
                        this.dateVal = va.join('-')
                        break;
                    case 'yy/mm/dd':
                        va[0] = va[0].toString().substr(2)
                        this.dateVal = va.join('/')
                        break;
                    default:
                        this.dateVal = va.join('/')
                }

                this.visibility = false
                this.$emit('confirm', val)
            },

            _showDatepicker() {
                this.visibility = true
            },

            _close() {
                this.visibility = false
            },
        }
    }
</script>

<style>

</style>