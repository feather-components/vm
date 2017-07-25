<template>
    <div :value="value">
        <iosselect :source="dateList" @confirm="_onSure" :value="selectVal"
                   @change="_setDays($event, 2)"  @close="_close" @scrollEnd="_scrollEnd"></iosselect>
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

	const [
		MONTHS,
		BIG_MONTHS,
		SMALL_MONTHS,
	] = [
		getMonths(),
		[1, 3, 5, 7, 8, 10, 12],
		[4, 6, 9, 11]
	]

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

	let getMinOrMax = (date, format) => {
		let v = []

        switch (format) {
            case 'yyyy-mm-dd':
                v = date.split('-')
                break;
            case 'yy-mm-dd':
                v = date.split('-')
                v[0] = v[0].toString().substr(2)
                break;
            case 'yy/mm/dd':
                v = date.split('/')
                v[0] = v[0].toString().substr(2)
                break;
            default:
                v = date.split('/')
        }
		return v
	}

	let getYearPre = (format) => {
    	let yearPre = ''
		if (['yy-mm-dd', 'yy/mm/dd'].indexOf(format) > -1) {
			yearPre = '20'
		}

		return yearPre
	}

	//获取默认选中的选项
	let currentDuringMinAndMax = (minDate, maxDate, format) => {
		let year, selectVal = [CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY],
            minDateArgs = [], maxDateArgs = [], yearPre = getYearPre(format)

        minDateArgs = getMinOrMax(minDate, format)

        maxDateArgs = getMinOrMax(maxDate, format)

		if (maxDateArgs.length > 0 && minDateArgs.length > 0 && maxDateArgs[0] < minDateArgs[0] ) {
			return
		}

		if (['yy-mm-dd', 'yy/mm/dd'].indexOf(format) > -1) {
			year = parseInt(CURRENT_YEAR.toString().substr(2))
		} else {
			year = parseInt(CURRENT_YEAR)
		}

		let mind = new Date([yearPre + year, minDateArgs[1], minDateArgs[2]].join("/")).getTime();
		let current = new Date(selectVal.join("/")).getTime()

        if (mind > current) {
			selectVal = minDateArgs
			selectVal[0] = yearPre + selectVal[0]
        }

		return selectVal
	}

	let getYears = (minDate, maxDate, format) => {
        let years = [], minYear, maxYear, yearPre = ''

		if (['yy-mm-dd', 'yy/mm/dd'].indexOf(format) > -1) {
        	yearPre = '20'
		}

		minYear = {label: yearPre + getMinOrMax(minDate, format)[0], value: yearPre + getMinOrMax( minDate, format)[0]}
		maxYear = {label: yearPre + getMinOrMax(maxDate, format)[0], value: yearPre + getMinOrMax( maxDate, format)[0]}

		years.push(minYear);

        let l = parseInt(maxYear.value) - parseInt(minYear.value)
        for (let i = 1; i <= l; i++) {
            let o = {
                label: parseInt(minYear.value)  + i,
                value: parseInt(minYear.value)  + i,
            };
            years.push(o)
        }

		return years
	}

    const DAYS =  getDays(CURRENT_YEAR, CURRENT_MONTH)

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

			minDate: {
                type: String,
                default: '2017-8-30'
            },

			maxDate: {
				type: String,
				default: '2020-10-1'
			}
        },

        data() {
            return {
				dateList:[
					getYears(this.minDate, this.maxDate, this.format),
					MONTHS,
					DAYS
				],
                dateVal: '',
                selectVal: currentDuringMinAndMax(this.minDate, this.maxDate, this.format),
                minDateArgs: getMinOrMax(this.minDate, this.format),
                maxDateArgs: getMinOrMax(this.maxDate, this.format),
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
			_scrollEnd(i, val, done) {
				if (i == 0) return
				let yearPre = getYearPre(this.format)

				let minDateInt = new Date([yearPre + this.minDateArgs[0], this.minDateArgs[1], this.minDateArgs[2]].join("/")).getTime();
				let maxDateInt = new Date([yearPre + this.maxDateArgs[0], this.maxDateArgs[1], this.maxDateArgs[2]].join("/")).getTime();
				let current = new Date(val.map((v, k) => {return v.value}).join("/")).getTime()

                let minIns = [1, 2]
                let minDates = [parseInt(this.minDateArgs[1]) + 1,parseInt(this.minDateArgs[2]) + 1]
                let minDateObjs = [{
					    label: parseInt(this.minDateArgs[1]),
                        value: parseInt(this.minDateArgs[1])
                    },{
					    label: parseInt(this.minDateArgs[2]),
                        value: parseInt(this.minDateArgs[2])
				    }]

				let maxIns = [1, 2]
				let maxDates = [parseInt(this.maxDateArgs[1]) + 1,parseInt(this.maxDateArgs[2]) + 1]
				let maxDateObjs = [{
					label: parseInt(this.maxDateArgs[1]),
					value: parseInt(this.maxDateArgs[1])
				},{
					label: parseInt(this.maxDateArgs[2]),
					value: parseInt(this.maxDateArgs[2])
				}]

                if (current < minDateInt) {
					done(minIns, minDates, minDateObjs)
                }

                if (current > maxDateInt) {
					done(maxIns, maxDates, maxDateObjs)
				}

            },

            _setDays(e) {
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

                switch (this.format) {
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

                this.selectVal = [valObj[0].value, valObj[1].value, valObj[2].value]

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