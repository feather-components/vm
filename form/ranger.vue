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
                <div class="range-value" v-if="sliderNum==1">
                    {{val[1]}}
                </div>
                <div class="range-value" v-else>
                    {{val[0]}} - {{val[1]}}
                </div>
            </slot>
        </div>
        <div class="ranger">
            <div class="ranger-body" ref="ranger_body">
                <div class="ranger-cover1" :style="{
                width:cover1$.width + 'px',
                transition: setting?'all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms':'none'
                }" v-if="sliderNum==2"></div>
                <div class="ranger-connect-line"></div>
                <div class="ranger-cover2" :style="{
                width:cover2$.width + 'px',
                transition: setting?'all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms':'none'
                }"></div>
                <div class='drag1' ref="drag1"
                     @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd"
                     :style="{
                     left:drag1$.left+'px',
                     transition: setting?'all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms':'none'
                     }" v-if="sliderNum==2"></div>
                <div class='drag2' ref="drag2"
                     @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd"
                     :style="{
                     left:drag2$.left+'px',
                     transition: setting?'all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms':'none'
                     }"></div>
            </div>
        </div>

    </div>
</template>
<style>
    .vmui-ranger {
        position: relative;
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

    .vmui-ranger .ranger-connect-line {
        position: absolute;
        top: 12px;
        left: 0;
        height: 3px;
        width: 100%;
        background: #6281C2;
        border-radius: 2px;
    }

    .vmui-ranger .ranger-cover2 {
        position: absolute;
        right: 0;
        top: 12px;
        height: 3px;
        z-index: 1;
        background: #e1e1e1;
    }

    .vmui-ranger .ranger-cover1 {
        position: absolute;
        left: 0;
        top: 12px;
        height: 3px;
        z-index: 1;
        background: #e1e1e1;
    }

    .vmui-ranger .drag1, .vmui-ranger .drag2 {
        position: absolute;
        top: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #e1e1e1;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
        z-index: 1
    }
</style>
<script>
    import {Draggable} from '../draggable';
    export default {
        props: {
            range: {
                type: Array,
                default () {
                    return [0, 1000]
                }
            },
            val: {
                type: Array,
                default () {
                    return [100, 600]
                }
            },
            sliderNum: {
                type: Number,
                validate (val) {
                    return val === 2 ? 2 : 1;
                },
                default: 1
            },
            labelShow: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                initLeft: 12, //drag块的left,常量
                cover2$: {
                    width: 0
                },
                cover1$: {
                    width: 0
                },
                drag2$: {
                    left: -12,
                    touchStartLeft: -12
                },
                drag1$: {
                    left: -12,
                    touchStartLeft: -12
                },
                clientMaxWidth: 0,
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
                this.jsToSetVal()
            }
        },
        methods: {
            /*判断value,是否正确*/
            valueToCorrect () {
                if (this.val[0] <= this.range[0] || this.val[0] >= this.range[1]) {
                    this.val[0] = this.range[0]
                }
                if (this.val[1] >= this.range[1] || this.val[1] <= this.range[0]) {
                    this.val[1] = this.range[1]
                }
            },
            /* 初始化处理 */
            initRanger () {
                let rbDom = this.$refs.ranger_body
                this.clientMaxWidth = rbDom.offsetWidth
                this.setValue()
            },
            setValue () {
                this.valueToCorrect()
                this.handleInitDrag2()
                if (this.sliderNum === 2) {
                    this.handleInitDrag1()
                }
            },
            setInitDrag2 () {
                this.drag2$.left = this.clientMaxWidth * ((this.val[1] - this.range[0]) / (this.range[1] - this.range[0])) - this.initLeft
            },
            setInitCover2 () {
                this.cover2$.width = this.clientMaxWidth * (( this.range[1] - this.val[1]) / (this.range[1] - this.range[0]))
            },
            setInitDrag1 () {
                this.drag1$.left = this.clientMaxWidth * ((this.val[0] - this.range[0]) / (this.range[1] - this.range[0])) - this.initLeft
            },
            setInitCover1 () {
                this.cover1$.width = this.clientMaxWidth * (( this.val[0] - this.range[0]) / (this.range[1] - this.range[0]))
            },
            handleInitDrag2 () {
                this.setInitDrag2()
                this.setInitCover2()
            },
            handleInitDrag1 () {
                this.setInitDrag1()
                this.setInitCover1()
            },
            onDragStart (e){
                this.drag2$.touchStartLeft = this.drag2$.left
                if (this.sliderNum === 2) {
                    this.drag1$.touchStartLeft = this.drag1$.left
                    this.$emit('ondragstart', this.val, e)
                } else {
                    this.$emit('ondragstart', this.val[1], e)
                }
            },
            /*拖动进行时*/
            onDraging (e) {
                if (e.target.className == 'drag1') {
                    this.setDrag1(e)
                    this.setCover1(e)
                } else {
                    this.setDrag2(e)
                    this.setCover2(e)
                }
                this.setVal(e)
            },
            setCover1 (e) {
                this.cover1$.width = this.drag1$.left + this.initLeft
            },
            setDrag1 (e) {
                let $drag1 = this.$refs.drag1
                this.drag1$.left = this.drag1$.touchStartLeft + e.data.x
                $drag1.style.transform = 'translate3d(0, 0, 0)'
                if (this.drag1$.left >= this.drag2$.left) {
                    this.drag1$.left = this.drag2$.left
                } else if (this.drag1$.left < -this.initLeft) {
                    this.drag1$.left = 0 - this.initLeft
                }
            },
            setCover2 (e) {
                this.cover2$.width = this.clientMaxWidth - (this.drag2$.left + this.initLeft)
            },
            setDrag2 (e) {
                let $drag2 = this.$refs.drag2
                this.drag2$.left = this.drag2$.touchStartLeft + e.data.x
                $drag2.style.transform = 'translate3d(0, 0, 0)'
                if (this.drag2$.left > this.clientMaxWidth - this.initLeft) {
                    this.drag2$.left = this.clientMaxWidth - this.initLeft
                } else if (this.sliderNum === 2 && this.drag1$.left >= this.drag2$.left) {
                    this.drag2$.left = this.drag1$.left
                } else if (this.drag2$.left < -this.initLeft) {
                    this.drag2$.left = 0 - this.initLeft
                }
            },
            setVal (e) {
                this.val[1] = (this.range[1] - this.range[0]) * ((this.clientMaxWidth - this.cover2$.width) / this.clientMaxWidth) + this.range[0]
                if (this.sliderNum === 2) {
                    this.val[0] = this.cover1$.width / this.clientMaxWidth * (this.range[1] - this.range[0]) + this.range[0]
                    this.$emit('onupdating', this.val, e)
                } else {
                    this.$emit('onupdating', this.val[1], e)
                }
            },
            /* 拖动进行时（结束）*/
            /*  拖动结束 */
            onDragEnd (e) {
                if (this.sliderNum === 1) {
                    this.$emit('ondragend', this.val[1], e)
                } else {
                    this.$emit('ondragend', this.val, e)
                }
            },
            /* 手动设置值 */
            jsToSetVal () {
                let _$ = this
                _$.setValue()
                _$.setting = true
                _$.$el.addEventListener('transitionend', (e) => {
                    _$.setting = false
                    _$.onDragEnd(e)
                })
            }
        }
    }
</script>