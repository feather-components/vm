<template>
    <div class="ranger-content">
        <div v-if="labelShow">
            <slot name="label-min">
                <span class="label-min">{{range[0]}}</span>
            </slot>
            <slot name="label-max">
                <span class="label-max">{{range[1]}}</span>
            </slot>
            <div class="range-value" v-if="sliderNum==1">
                {{value[1]}}
            </div>
            <div class="range-value" v-else>
                {{value[0]}} - {{value[1]}}
            </div>
        </div>
        <div class="ranger">
            <div class="ranger-body">
                <div class="ranger-max-line">
                </div>
                <div class='drag1' v-draggable="{axis: 'x'}"
                     @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd"
                     :style="{left:dragObj1.left+'px'}" :class="{'set-trans':setting}"
                     v-if="sliderNum==2"
                ></div>
                <div class="ranger-connect-line" :class="{'set-trans':setting}"
                     :style="{width:connectObj.width+'%',left:connectObj.left+'%'}">
                </div>
                <div class='drag2' v-draggable="{axis: 'x'}"
                     @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd" :class="{'set-trans':setting}"
                     :style="{left:dragObj2.left+'px'}"
                ></div>
            </div>
        </div>

    </div>
</template>
<style>
    .ranger-content {
        position: relative;
        /*padding-top: 12px;*/
    }

    .ranger-content .range-value {
        position: absolute;
        width: 200px;
        left: 50%;
        top: -15px;
        margin-left: -100px;
        text-align: center;
    }

    .ranger {
        width: 100%;
        height: 28px;
        box-sizing: border-box;
        padding: 0 12px;
        /*overflow: hidden;*/
        position: relative;
    }

    .ranger-content .label-min {
        display: inline-block;
        position: absolute;
        left: 0;
        top: -15px
    }

    .ranger-content .label-max {
        display: inline-block;
        position: absolute;
        right: 0;
        top: -15px
    }

    .ranger > .ranger-body {
        width: 100%;
        position: relative;
    }

    .ranger-max-line {
        position: absolute;
        top: 12px;
        left: 0;
        width: 100%;
        height: 3px;
        background: #e1e1e1;
    }

    .ranger-connect-line {
        position: absolute;
        height: 3px;
        top: 12px;
        background: #6281C2;
    }

    .drag1, .drag2 {
        position: absolute;
        /*left:12px;*/
        top: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #e1e1e1;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
        z-index: 1
    }

    .set-trans {
        transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1)
    }
</style>
<script>
    import channel from './channel.js'
    export default {
        props: {
            range: {
                type: Array,
                default () {
                    return [300, 1000]
                }
            },
            initRange: {
                type: Array,
                default () {
                    return [400, 800]
                }
            },
            sliderNum: {
                type: Number,
                validate (val) {
                    return val === 2 ? 2 : 1;
                },
                default: 1
            },
            floatFixed: {
                type: Number,
                default: 0
            },
            labelShow: {
                type: Boolean,
                default: true
            },
            val: {
                type: Array
            }
        },
        data () {
            return {
                initLeft: 12, //drag块的left,常量
                connectObj: {
                    left: 0,
                    initWidth: 0,
                    width: 0,
                    widthNumber: 0
                },
                dragObj2: {
                    left: -12,
                    moveX: 0,
                    touchStartLeft: -12
                },
                dragObj1: {
                    left: -12,
                    moveX: 0,
                    touchStartLeft: -12
                },
                clientMaxWidth: 0,
                value: this.initRange,
                minStop: {
                    status: false,
                    translateX: 0
                },
                maxStop: {
                    status: false,
                    translateX: 0
                },
                touchStartX: 0,
                touchingX: 0,
                setting: false
            }
        },
        mounted () {
            this.initRanger()
        },
        watch: {
            val (val) {
                this.setValue(val)
            }
        },
        methods: {
            /* 初始化处理 */
            initRanger () {
                let rbDom = this.$el.querySelector('.ranger-body')
                this.clientMaxWidth = rbDom.offsetWidth
                /* 初始化值不正常报错返回 */
                if (this.initRange.some((val) => {
                            return val < this.range[0] || val > this.range[1]
                        })) {
                    throw new Error('initRange必须在range范围之内')
                    return
                }
                /* 区分一个滑块还是两个滑块 */
                if (this.sliderNum === 1) {
                    this.handleInitSliderOne()
                } else {
                    this.handleInitSliderTwo()
                }
            },
            handleInitSliderOne () {
                if (this.initRange[1] >= this.range[1]) {
                    this.connectObj.width = this.connectObj.initWidth = 100
                } else {
                    this.connectObj.width = this.connectObj.initWidth = parseFloat((this.initRange[1] - this.range[0]) / (this.range[1] - this.range[0])).toFixed(6) * 100
                }
                this.dragObj2.left = this.dragObj2.touchStartLeft = this.connectObj.width / 100 * this.clientMaxWidth + this.dragObj2.left
            },
            handleInitSliderTwo() {
                let tempLeft = this.dragObj1.left
                if (this.initRange[0] <= this.range[0]) {
                    this.connectObj.left = 0
                } else {
                    this.connectObj.left = parseFloat((this.initRange[0] - this.range[0]) / (this.range[1] - this.range[0])).toFixed(6) * 100
                    this.dragObj1.left = parseFloat((this.initRange[0] - this.range[0]) / (this.range[1] - this.range[0])).toFixed(6) * 100
                    this.dragObj1.left = this.dragObj1.touchStartLeft = this.clientMaxWidth * (this.dragObj1.left / 100) + tempLeft
                }
                this.connectObj.width = this.connectObj.initWidth = parseFloat((this.initRange[1] - this.initRange[0]) / (this.range[1] - this.range[0])).toFixed(6) * 100
                /* 由于未渲染成功，必须nextTick之后执行 */
                this.$nextTick(() => {
                    let connectWidthNumber = this.$el.querySelector(".ranger-connect-line").offsetWidth
                    this.dragObj2.left = this.dragObj2.touchStartLeft = this.dragObj1.left + connectWidthNumber
                    this.connectObj.widthNumber = this.clientMaxWidth * this.connectObj.width / 100
                })
            },
            onDragStart (e){
                this.touchStartX = e.data.event.touches[0].pageX
                if (this.sliderNum === 1) {
                    this.onDragStartSliderOne(e)
                } else {
                    this.onDragStartSliderTwo(e)
                }
            },
            onDragStartSliderOne (e) {
                this.connectObj.widthNumber = this.connectObj.initWidth / 100 * this.clientMaxWidth;
                this.dragObj2.touchStartLeft = this.dragObj2.left
                this.$emit('ondragstart', this.value[1], e)
            },
            onDragStartSliderTwo (e) {
                this.dragObj1.touchStartLeft = this.dragObj1.left
                this.dragObj2.touchStartLeft = this.dragObj2.left
                this.$emit('ondragstart', this.value, e)
            },
            onDraging (e) {
                if (this.sliderNum === 1) {
                    this.onDragingSliderOne(e)
                } else {
                    this.onDragingSliderTwo(e)
                }
            },
            onDragingSliderOne (e) {
                let moveX1 = e.data.event.touches[0].pageX - this.touchStartX,
                        moveX2 = e.data.event.touches[0].pageX - this.touchingX
                if (moveX1 > 0 || moveX2 > 0) {
                    this.minStop.status = false
                }
                if (moveX1 < 0 || moveX2 < 0) {
                    this.maxStop.status = false
                }
                let sliderDom = this.$el.querySelector('.drag2')
                if (this.minStop.status) {
                    sliderDom.style.transform = 'translate3d(-' + parseInt(sliderDom.offsetLeft + this.initLeft) + 'px, 0px, 0px)'
                    return
                }
                if (this.maxStop.status) {
                    sliderDom.style.transform = 'translate3d(' + parseInt(this.maxStop.translateX) + 'px, 0px, 0px)'
                    return
                }
                this.touchingX = e.data.event.touches[0].pageX
                this.handleLeftOutOne(e.data.x)
                this.handleRightOutOne(e.data.x)
                this.connectObj.width = parseFloat((this.connectObj.widthNumber + e.data.x) / this.clientMaxWidth).toFixed(6) * 100
                //                this.value[1] = parseInt(parseFloat(this.connectObj.width / 100  * (this.range[1] - this.range[0])).toFixed(this.floatFixed)) + this.range[0]
                this.value[1] = (this.connectObj.width / 100) * (this.range[1] - this.range[0]) + this.range[0]
                /* 当滑块超过最大值或者最小值时处理 */
                if (this.value[1] >= this.range[1])
                    this.value[1] = this.range[1]
                this.value[0] = 0
                if (this.value[1] <= this.range[0])
                    this.value[1] = this.range[0]
                /* 滑到左右顶部时意外处理*/
                if (parseInt(this.value[1]) === this.range[0]) {
                    this.connectObj.width = 0
                }
                if (parseInt(this.value[1]) === this.range[1]) {
                    this.connectObj.width = 100
                }
                this.$emit('onupdating', this.value[1], e)
            },
            onDragingSliderTwo (e) {
                if (e.target.className === 'drag1') {
                    this.handleDragingSliderTwoForOne(e)
                } else {
                    this.handleDragingSliderTwoForTwo(e)
                }
            },
            handleDragingSliderTwoForOne (e) {
                let moveX1 = e.data.event.touches[0].pageX - this.touchStartX,
                        moveX2 = e.data.event.touches[0].pageX - this.touchingX
                let dragDom = this.$el.querySelector('.' + e.target.className)
                if (moveX1 > 0 || moveX2 > 0) {
                    this.minStop.status = false
                }
                if (this.minStop.status) {
                    this.dragObj1.left = 0 - this.initLeft
                    dragDom.style.transform = 'translate3d(0px, 0px, 0px)'
                    return
                }
                this.touchingX = e.data.event.touches[0].pageX
                this.handleLeftOutTwo(e.data.x)
                this.dragObj1.left = this.dragObj1.touchStartLeft + e.data.x
                if (this.dragObj1.left >= this.dragObj2.left) {
                    this.dragObj1.left = this.dragObj2.left
                } else if (this.dragObj1.left <= -this.initLeft) {
                    this.dragObj1.left = -this.initLeft
                }
                dragDom.style.transform = 'translate3d(0px, 0px, 0px)'
                this.value[0] = ((this.dragObj1.left + this.initLeft) / this.clientMaxWidth) * (this.range[1] - this.range[0]) + this.range[0]
                if (this.value[0] <= this.range[0]) {
                    this.value[0] = this.range[0]
                } else if (this.value[0] >= this.value[1]) {
                    this.value[0] = this.value[1]
                }
                this.$nextTick(() => {
                    let left = this.dragObj1.left + this.initLeft
                    this.connectObj.left = left / this.clientMaxWidth * 100
                    this.connectObj.width = (this.dragObj2.left + 12 - this.dragObj1.left) / this.clientMaxWidth * 100
                    this.$emit('onupdating', this.value[1], e)
                })
            },

            handleDragingSliderTwoForTwo (e) {
                let moveX1 = e.data.event.touches[0].pageX - this.touchStartX,
                        moveX2 = e.data.event.touches[0].pageX - this.touchingX
                let dragDom = this.$el.querySelector('.' + e.target.className)
                if (moveX1 < 0 || moveX2 < 0) {
                    this.maxStop.status = false
                }
                if (this.maxStop.status) {
                    this.dragObj2.left = this.clientMaxWidth - this.initLeft
                    dragDom.style.transform = 'translate3d(0px, 0px, 0px)'
                    return
                }
                this.touchingX = e.data.event.touches[0].pageX
                this.handleRightOutTwo(e.data.x)
                this.dragObj2.left = this.dragObj2.touchStartLeft + e.data.x
                if (this.dragObj1.left >= this.dragObj2.left) {
                    this.dragObj2.left = this.dragObj1.left
                } else if (this.dragObj2.left >= this.clientMaxWidth - this.initLeft) {
                    this.dragObj2.left = this.clientMaxWidth - this.initLeft
                }
                dragDom.style.transform = 'translate3d(0px, 0px, 0px)'
                this.value[1] = ((this.dragObj2.left + this.initLeft) / this.clientMaxWidth) * (this.range[1] - this.range[0]) + this.range[0]
                if (this.value[1] >= this.range[1]) {
                    this.value[1] = this.range[1]
                } else if (this.value[1] <= this.value[0]) {
                    this.value[1] = this.value[0]
                }
                this.$nextTick(() => {
                    this.connectObj.width = (this.dragObj2.left - this.dragObj1.left + this.initLeft) / this.clientMaxWidth * 100
                    this.$emit('onupdating', this.value[1], e)
                })
            },
            /*  判断是否左滑出去了（一个滑块）*/
            handleLeftOutOne (x) {
                let sliderDom = this.$el.querySelector('.drag2')
                if (-sliderDom.offsetLeft - 15 >= x) {
                    this.minStop.status = true
                    this.minStop.translateX = x - this.initLeft
                }
            },
            /*  判断是否右滑出去了（一个滑块）*/
            handleRightOutOne (x) {
                let sliderDom = this.$el.querySelector('.drag2')
                /* 防止不能滑到最大值将12改为8 */
                if (this.clientMaxWidth - sliderDom.offsetLeft - 8 <= x) {
                    this.maxStop.status = true
                    this.maxStop.translateX = this.clientMaxWidth - sliderDom.offsetLeft - this.initLeft
                }
            },
            /*  判断是否左滑出去了（两个滑块） */
            handleLeftOutTwo (x) {
                let sliderDom = this.$el.querySelector('.drag1')
                if (sliderDom.offsetLeft + this.initLeft <= 0) {
                    this.dragObj1.left = 0 - this.initLeft
                    this.connectObj.left = 0
                    this.minStop.status = true
                }
            },
            handleRightOutTwo (x) {
                let sliderDom = this.$el.querySelector('.drag2')
                if (sliderDom.offsetLeft >= this.clientMaxWidth - this.initLeft) {
                    this.maxStop.status = true
                    this.maxStop.translateX = this.clientMaxWidth - this.initLeft
                }
            },
            /*  判断是否右滑出去了（两个滑块） */
            onDragEnd (e) {
                if (this.sliderNum === 1) {
                    this.$emit('ondragend', this.value[1], e)
                } else {
                    this.$emit('ondragend', this.value, e)
                }
            },
            /* 父元素改变状态值 */
            setValue (val) {
                var _$ = this
                if (val.some((v) => {
                            return v < _$.range[0] || v > _$.range[1]
                        })) {
                    throw new Error('val必须在range范围之内')
                    return
                }
                _$.value = val;
                _$.setting = true
                if (_$.sliderNum === 1) {
                    _$.setValueOne()
                } else {
                    _$.setValueTwo()
                }
                _$.$el.addEventListener('transitionend', () => {
                    _$.setting = false
                })
            },
            setValueOne () {
                let sliderDom = this.$el.querySelector('.drag2')
                this.connectObj.initWidth = this.connectObj.width = (this.value[1] - this.range[0]) / (this.range[1] - this.range[0]) * 100
                this.connectObj.widthNumber = this.clientMaxWidth * this.connectObj.width / 100
                this.dragObj2.left = this.connectObj.widthNumber - this.initLeft
                sliderDom.style.transform = 'translate3d(0, 0, 0)'
                this.$emit('ondragend', this.value[1])
            },
            setValueTwo () {
                let [sliderDom1, sliderDom2] = [this.$el.querySelector('.drag1'), this.$el.querySelector('.drag2')]
                this.dragObj1.left = (this.value[0] - this.range[0]) / (this.range[1] - this.range[0]) * this.clientMaxWidth - this.initLeft
                this.dragObj2.left = (this.value[1] - this.range[0]) / (this.range[1] - this.range[0]) * this.clientMaxWidth - this.initLeft
                this.connectObj.left = (this.dragObj1.left + 12) / this.clientMaxWidth * 100
                this.connectObj.initWidth = this.connectObj.width = (this.dragObj2.left - this.dragObj1.left) / this.clientMaxWidth * 100
                this.connectObj.widthNumber = this.clientMaxWidth * this.connectObj.width / 100
                sliderDom1.style.transform = 'translate3d(0, 0, 0)'
                sliderDom2.style.transform = 'translate3d(0, 0, 0)'
            }
        }
    }
</script>