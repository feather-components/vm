<template>
    <div>
        <div  v-iosselect="{
        selectList:dateList,
        onSure:_onSure,
        connectEvents:[{connectPrev:1,connectNext:2,callback:_setDays}],
        autoFill: false
        }">
            <slot>
                <input type="text" class="vmui-datepicker" v-model="dateVal"/>
            </slot>
        </div>

    </div>
</template>

<script>
    import iosselect from '../iosselect'
    
    const [CURRENT_YEAR, CURRENT_MONTH] = [new Date().getFullYear(), new Date().getMonth()+1]

    let getYears = () => {
        let years = [CURRENT_YEAR]

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

        },

        data() {
            return {
                dateList:[
                    YEARS,
                    MONTHS,
                    DAYS
                ],
                dateVal: ''
            }
        },

        directives: {
            iosselect
        },

        methods: {
            _setDays(val, prev, next, done) {
                let days = getDays(val[0].value, val[1].value)
                done(days, next)
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
.vmui-datepicker{
    border:1px solid #000000;
}
</style>