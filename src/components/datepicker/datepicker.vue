<template>
    <div :value="value">
        <iosselect :source="dateList" @confirm="_onSure" :value="selectVal"
                   @change="_setDays($event, 2)"  @close="_close"></iosselect>
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

    let isSetCurrentYears = (years, currentYear) => {
    	for (let k in  years) {
    		if (years[k].value === currentYear) {
    			return true
            }
        }
        return false
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
            format: {
                type: String,
                default: 'yyyy/mm/dd'
            },

            value: {
            	type: String,
                default: ''
            },

			years: {
				type: Array,
				default: []
			}
        },

        data() {
            return {
                dateList:[
                    this.years.length === 0 ? YEARS : this.years,
                    MONTHS,
                    DAYS
                ],
                dateVal: '',
                selectVal: (isSetCurrentYears(this.years, CURRENT_YEAR) ||  this.years.length === 0) ?
                    [CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY] : [this.years[0].value, 1, 1]
		}
        },

        watch: {
			dateVal (v) {
				this.$emit('input', v)

            },

            value (v) {
				this.dateVal = v
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

            _onSure (labels, vals, valObj) {
                let va = []

				valObj.forEach((v, k) => {
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
                this.$nextTick(() => {
					this.$emit('confirm', vals, labels, valObj)
				})
            },

            _close() {
                this.$emit('close')
            },
        }
    }
</script>

<style>

</style>