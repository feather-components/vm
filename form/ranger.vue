<template>
    <div class="vmui-ranger">
        <div v-if="labelShow">
            <slot name="label-min">
                <span class="label-min">{{range[0]}}</span>
            </slot>
            <slot name="label-max">
                <span class="label-max">{{range[1]}}</span>
            </slot>
            <slot name="label-value">
                <div class="range-value" v-if="sliderNum==1" >
                    {{value[1]}}
                </div>
                <div class="range-value" v-else>
                    {{value[0]}} - {{value[1]}}
                </div>
            </slot>
        </div>
        <div class="ranger">
            <div class="ranger-body" ref="ranger_body">
                <div class="ranger-max-line">
                </div>
                <div class='drag1'  ref="drag1"
                     @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd"
                     :style="{
                     left:dragObj1.left+'px',
                     transition: setting?'all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms':'none'
                     }"
                     v-if="sliderNum==2"
                ></div>
                <div class="ranger-connect-line" :class="{'set-trans':setting}"
                     :style="{
                     width:connectObj.width+'px',
                     left:connectObj.left+'px',
                     transition: setting?'all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms':'none'
                     }">
                </div>
                <div class='drag2'  ref="drag2"
                     @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd"
                     :style="{
                     left:dragObj2.left+'px',
                     transition: setting?'all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms':'none'
                     }"
                ></div>
            </div>
        </div>

    </div>
</template>
<style>
    .vmui-ranger {
        position: relative;
        /*padding-top: 12px;*/
    }

    .vmui-ranger .range-value {
        position: absolute;
        width: 200px;
        left: 50%;
        top: -15px;
        margin-left: -100px;
        text-align: center;
    }

    .vmui-ranger .ranger {
        width: 100%;
        height: 28px;
        box-sizing: border-box;
        padding: 0 12px;
        /*overflow: hidden;*/
        position: relative;
    }

    .vmui-ranger .label-min {
        display: inline-block;
        position: absolute;
        left: 0;
        top: -15px
    }

    .vmui-ranger .label-max {
        display: inline-block;
        position: absolute;
        right: 0;
        top: -15px
    }

    .vmui-ranger .ranger > .ranger-body {
        width: 100%;
        position: relative;
    }

    .vmui-ranger .ranger-max-line {
        position: absolute;
        top: 12px;
        left: 0;
        width: 100%;
        height: 3px;
        background: #e1e1e1;
    }

    .vmui-ranger .ranger-connect-line {
        position: absolute;
        height: 3px;
        top: 12px;
        background: #6281C2;
    }

    .vmui-ranger .drag1,.vmui-ranger .drag2 {
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

    .vmui-ranger .set-trans {
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
        -webkit-transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
        -moz-transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    }
</style>
<script>
    import {Draggable} from '../draggable'
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
                    width: 0,
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
                touchStartX: 0,
                touchingX: 0,
                setting: false
            }
        },
        mounted () {
            if (this.sliderNum === 2) {
                new Draggable(this.$refs.drag1, {
                    axis: 'x'
                });
            }
            new Draggable(this.$refs.drag2, {
                axis: 'x'
            });
            this.initRanger()
        },
        watch: {
            val (val) {
                this.setValue(val)
            }
        },
        methods: {
            /*判断value,是否正确*/
            valueToCorrect (value) {
                if (value[0] <= this.range[0] || value[0] >= this.range[1]) {
                    value[0] = this.range[0]
                }
                if (value[1] >= this.range[1] || value[1] <= this.range[0]) {
                    value[1] = this.range[1]
                }
            },
            /* 初始化处理 */
            initRanger () {
                let rbDom = this.$refs.ranger_body
                this.clientMaxWidth = rbDom.offsetWidth
                this.valueToCorrect(this.initRange)
                /* 区分一个滑块还是两个滑块 */
                if (this.sliderNum === 1) {
                    this.handleInitSliderOne()
                } else {
                    this.handleInitSliderTwo()
                }
            },
            handleInitSliderOne () {
                if (this.initRange[1] >= this.range[1]) {
                    this.connectObj.width = this.clientMaxWidth
                } else {
                    this.connectObj.width = parseFloat((this.initRange[1] - this.range[0]) / (this.range[1] - this.range[0])) * this.clientMaxWidth
                }
                this.dragObj2.left = this.dragObj2.touchStartLeft = this.connectObj.width - this.initLeft
            },
            handleInitSliderTwo() {
                let tempLeft = this.dragObj1.left
                if (this.initRange[0] <= this.range[0]) {
                    this.connectObj.left = 0
                } else {
                    this.connectObj.left = parseFloat((this.initRange[0] - this.range[0]) / (this.range[1] - this.range[0])) * this.clientMaxWidth
                    this.dragObj1.touchStartLeft = this.dragObj1.left = this.connectObj.left - this.initLeft
                }
                this.connectObj.width = parseFloat((this.initRange[1] - this.initRange[0]) / (this.range[1] - this.range[0])) * this.clientMaxWidth
                /* 由于未渲染成功，必须nextTick之后执行 */
                this.$nextTick(() => {
                    this.dragObj2.left = this.dragObj2.touchStartLeft = this.dragObj1.left + this.connectObj.width
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
                this.dragObj2.touchStartLeft = this.dragObj2.left
                this.value[0] = this.range[0]
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
                let sliderDom = this.$el.querySelector('.drag2')

                if (sliderDom != undefined) {
                    sliderDom.style.transform = 'translate3d(0px, 0px, 0px)'
                }
                this.dragObj2.left = this.dragObj2.touchStartLeft + e.data.x
                if (this.dragObj2.left >= this.clientMaxWidth - this.initLeft) {
                    this.dragObj2.left = this.clientMaxWidth - this.initLeft
                } else if (this.dragObj2.left <= -this.initLeft) {
                    this.dragObj2.left = -this.initLeft
                }
                this.connectObj.width = parseFloat((this.dragObj2.left + this.initLeft) / this.clientMaxWidth) * this.clientMaxWidth
                this.value[1] = (this.connectObj.width / this.clientMaxWidth) * (this.range[1] - this.range[0]) + this.range[0]
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
                this.setDragLeft(e)
                if (this.dragObj1.left >= this.dragObj2.left) {
                    this.dragObj1.left = this.dragObj2.left
                } else if (this.dragObj1.left <= -this.initLeft) {
                    this.dragObj1.left = -this.initLeft
                }
                this.value[0] = ((this.dragObj1.left + this.initLeft) / this.clientMaxWidth) * (this.range[1] - this.range[0]) + this.range[0]
                if (this.value[0] <= this.range[0]) {
                    this.value[0] = this.range[0]
                } else if (this.value[0] >= this.value[1]) {
                    this.value[0] = this.value[1]
                }
                this.$nextTick(() => {
                    this.dragingFinished(e)
                })
            },
            handleDragingSliderTwoForTwo (e) {
                this.setDragLeft(e)
                if (this.dragObj1.left >= this.dragObj2.left) {
                    this.dragObj2.left = this.dragObj1.left
                } else if (this.dragObj2.left >= this.clientMaxWidth - this.initLeft) {
                    this.dragObj2.left = this.clientMaxWidth - this.initLeft
                }
                this.value[1] = ((this.dragObj2.left + this.initLeft) / this.clientMaxWidth) * (this.range[1] - this.range[0]) + this.range[0]
                if (this.value[1] >= this.range[1]) {
                    this.value[1] = this.range[1]
                } else if (this.value[1] <= this.value[0]) {
                    this.value[1] = this.value[0]
                }
                this.$nextTick(() => {
                    this.dragingFinished(e)
                })
            },
            setDragLeft (e) {
                let dragDom = this.$refs[e.target.className]
                this.touchingX = e.data.event.touches[0].pageX
                if (e.target.className == 'drag2') {
                    this.dragObj2.left = this.dragObj2.touchStartLeft + e.data.x
                } else {
                    this.dragObj1.left = this.dragObj1.touchStartLeft + e.data.x
                }
                if (dragDom != undefined) {
                    dragDom.style.transform = 'translate3d(0px, 0px, 0px)'
                }
            },
            dragingFinished (e) {
                if (e.target.className == 'drag1') {
                    this.connectObj.left = this.dragObj1.left + this.initLeft
                }
                this.connectObj.width = (this.dragObj2.left - this.dragObj1.left + this.initLeft) / this.clientMaxWidth * this.clientMaxWidth
                this.$emit('onupdating', this.value[1], e)
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
                let _$ = this
                _$.value = val;
                this.valueToCorrect(this.value)
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
                let $drag2 =  this.$refs.drag2
                this.connectObj.width = (this.value[1] - this.range[0]) / (this.range[1] - this.range[0]) * this.clientMaxWidth
                this.dragObj2.left = this.connectObj.width - this.initLeft
                $drag2.style.transform = 'translate3d(0, 0, 0)'
                this.$emit('ondragend', this.value[1])
            },
            setValueTwo () {
                let [$drag1, $drag2] = [this.$refs.drag1, this.$refs.drag2]
                this.dragObj1.left = (this.value[0] - this.range[0]) / (this.range[1] - this.range[0]) * this.clientMaxWidth - this.initLeft
                this.dragObj2.left = (this.value[1] - this.range[0]) / (this.range[1] - this.range[0]) * this.clientMaxWidth - this.initLeft
                this.connectObj.left =  this.dragObj1.left + this.initLeft
                this.connectObj.width = (this.dragObj2.left - this.dragObj1.left) / this.clientMaxWidth * this.clientMaxWidth
                $drag1.style.transform = 'translate3d(0, 0, 0)'
                $drag2.style.transform = 'translate3d(0, 0, 0)'
                this.$emit('ondragend', this.value)
            }
        }
    }
</script>