<template>
    <div class="vmui-ranger">
        <span class="label-min">{{range[0]}}</span>
        <span class="label-max">{{range[1]}}</span>
        <div v-if="valueShow">
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
                <div class="ranger-cover1" :class="{setting:setting}" ref="cover1"  v-if="sliderNum==2"></div>
                <div class="ranger-connect-line"></div>
                <div class="ranger-cover2" :class="{setting:setting}" ref="cover2" ></div>
                <div class='drag1' ref="drag1" v-draggable="{axis: 'x'}"
                     @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd" :class="{setting:setting}"
                     v-if="sliderNum==2"></div>
                <div class='drag2' ref="drag2" v-draggable="{axis: 'x'}"
                     @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd" :class="{setting:setting}"
                ></div>
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
    .vmui-ranger .drag1{
        z-index:3!important;
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
    .vmui-ranger .setting{
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms
    }
</style>
<script>
    import channel from './channel';
    import _ from '../helper';
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
            valueShow: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                initLeft: 12, //drag块的left,常量
                drag2$: {
                    touchStartLeft: 0
                },
                drag1$: {
                    touchStartLeft: 0
                },
                clientMaxWidth: 0,
                setting: false,
                rangerNumber:0
            }
        },
        mounted () {
            this.rangerNumber = this.range[1] - this.range[0]
            this._initRanger()
        },
        watch: {
            val (val) {
                this.jsToSetVal()
            }
        },
        methods: {
            /*判断value,是否正确*/
            _valueToCorrect () {
                this.val[1] =Math.max( this.val[0], this.val[1])
                this.val[0] =Math.min( this.val[0], this.val[1])
                this.val[0] = this.val[0] < this.range[0] ? this.range[0] : this.val[0]
                this.val[1] = this.val[1] > this.range[1] ? this.range[1] : this.val[1]
            },
            /* 初始化处理 */
            _initRanger () {
                let rbDom = this.$refs.ranger_body
                this.clientMaxWidth = rbDom.offsetWidth
                this._setValue()
            },
            _setValue () {
                this._valueToCorrect()
                this._handleSetDrag2()
                if (this.sliderNum === 2) {
                    this._handleSetDrag1()
                }
            },
            _handleSetDrag2 () {
                _.css(this.$refs.drag2, 'left', this.clientMaxWidth * ((this.val[1] - this.range[0]) / this.rangerNumber) - this.initLeft + 'px');
                _.css(this.$refs.cover2, 'width', this.clientMaxWidth * (( this.range[1] - this.val[1]) / this.rangerNumber)+ 'px');
            },
            _handleSetDrag1 () {
                var vr = this.val[0] - this.range[0]
                _.css(this.$refs.drag1, 'left', this.clientMaxWidth * (vr / this.rangerNumber) - this.initLeft + 'px');
                _.css(this.$refs.cover1, 'width', this.clientMaxWidth * (vr / this.rangerNumber) + 'px');
            },
            onDragStart (e){
                this.drag2$.touchStartLeft = this.$refs.drag2.offsetLeft
                if (this.sliderNum === 2) {
                    this.drag1$.touchStartLeft = this.$refs.drag1.offsetLeft
                    this.$emit('drag:start', this.val, e)
                } else {
                    this.$emit('drag:start', this.val[1], e)
                }
            },
            /*拖动进行时*/
            onDraging (e) {
                if (e.target.className == 'drag1') {
                    this._setDrag1AndCover1(e)
                } else {
                    this._setDrag2AndCover2(e)
                }
                this._setVal(e)
            },
            _setDrag1AndCover1 (e) {
                let $drag1 = this.$refs.drag1
                _.css($drag1, 'left', this.drag1$.touchStartLeft + e.data.x + 'px');
                _.css($drag1, 'transform', 'translate3d(0, 0, 0)');

                $drag1.offsetLeft >= this.$refs.drag2.offsetLeft &&
                _.css($drag1, 'left', this.$refs.drag2.offsetLeft + 'px')

                $drag1.offsetLeft < -this.initLeft &&
                _.css($drag1, 'left',  -this.initLeft + 'px')

                $drag1.offsetLeft >= this.clientMaxWidth - 3 * this.initLeft && _.css($drag1, 'z-index', '10')
                _.css(this.$refs.cover1, 'width', $drag1.offsetLeft + this.initLeft + 'px');
            },
            _setDrag2AndCover2 (e) {
                let $drag2 = this.$refs.drag2
                _.css($drag2, 'left', this.drag2$.touchStartLeft + e.data.x + 'px');
                _.css($drag2, 'transform', 'translate3d(0, 0, 0)');

                $drag2.offsetLeft > this.clientMaxWidth - this.initLeft &&
                _.css($drag2, 'left', this.clientMaxWidth - this.initLeft + 'px')

                this.sliderNum === 2 && this.$refs.drag1.offsetLeft >= $drag2.offsetLeft &&
                _.css($drag2, 'left', this.$refs.drag1.offsetLeft + 'px')

                $drag2.offsetLeft < -this.initLeft &&
                _.css($drag2, 'left', -this.initLeft + 'px')

                $drag2.offsetLeft <= this.initLeft && _.css($drag2, 'z-index', '10')
                _.css(this.$refs.cover2, 'width', this.clientMaxWidth - ($drag2.offsetLeft + this.initLeft) + 'px');
            },
            _setVal (e) {
                e.target.className == 'drag2' ?
                        this.val[1] = this.rangerNumber * ((this.clientMaxWidth - this.$refs.cover2.offsetWidth) / this.clientMaxWidth) + this.range[0]
                        : this.val[0] = this.$refs.cover1.offsetWidth / this.clientMaxWidth * this.rangerNumber + this.range[0]
                this.sliderNum === 2 ? this.$emit('updating', this.val, e) : this.$emit('updating', this.val[1], e)
                this.$forceUpdate()
            },
            /*  拖动结束 */
            onDragEnd (e) {
                if (this.sliderNum === 1) {
                    this.$emit('drag:end', this.val[1], e)
                } else {
                    this.$emit('drag:end', this.val, e)
                }
            },
            /* 手动设置值 */
            jsToSetVal () {
                let _$ = this
                _$._setValue()
                _$.setting = true
                _$.$el.addEventListener('transitionend', (e) => {
                    _$.setting = false
                    _$.onDragEnd(e)
                })
            }
        }
    }
</script>