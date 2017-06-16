<template>
    <div>
        <div  v-iosselect="{
        selectList:dateList,
        onSure:_onSure,
        connectEvents:[{connectDouble:[1,2],callback:_setDays}],
        autoFill: false,
        val: selectVal
        }">
            <slot>
                <input type="text" class="vmui-datepicker" v-model="dateVal" :style="inputStyle"/>
            </slot>
        </div>
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
                selectVal: [CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY]
            }
        },

        directives: {
            iosselect
        },

        methods: {
            _setDays(val,connectDouble, done) {
                let days = getDays(val[0].value, val[1].value)
                done(days, connectDouble[1])
            },

            _onSure (val) {
                let va = []

                val.forEach((v, k) => {
                    va.push(v.label)
                })

                this.dateVal = va.join('/')
                this.$emit('on-sure', val)
            }
        }
    }
</script>

<style>

</style>