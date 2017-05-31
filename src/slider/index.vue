<style>
    .slider .noUi-connect {
        background: #6281C2 !important;
    }

    .slider.noUi-target {
        background: #e1e1e1;
        border: 0;
        box-shadow: none;
    }

    .slider.noUi-horizontal {
        height: 3px;
        border-radius: 1.5px;
    }

    .slider .noUi-origin {
        top: -6px;
    }

    .slider.noUi-horizontal .noUi-handle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.20);
    }

    .slider .noUi-handle:before, .slider .noUi-handle:after {
        display: none;
    }
</style>

<template>
    <div :id="id" class="slider"></div>
</template>

<script>
    import Vue from 'vue';
    import noUiSlider from 'nouislider';

    export default{
        name: "slider",
        props: {
            /*id*/
            sid: {
                type: String,
            },
            /*初始值*/
            initStart: {
                type: Number,
                require: true
            },
            initEnd: {
                type: Number,
                require: true
            },
            /*最小值*/
            minValue: {
                type: Number,
                require: true
            },
            /*最大值*/
            maxValue: {
                type: Number,
                require: true
            },
            /*是否为一个/两个滑块*/
            sliderNumber: {
                type: Number,
                validator: val=> {
                    if ([1, 2].indexOf(val) > -1) {  /*滑块个数1,2*/
                        return val;
                    } else {
                        return 1;
                    }
                }
            },

            /*rangeLight*/
            rangeLight: {
                type: Number
            },

            /*父元素手动设置*/
            value: {
                type: Array
            }
        },

        data(){
            return {
                $ele: "",
                min: this.minValue,
                max: this.maxValue,
                events: ['update', 'slide', 'set', 'change', 'start', 'end'], /*事件触发*/
                range: "",
            }
        },


        watch: {
            getChangeValue: function (val) {
                console.log(this.$ele, 9999)
                this.$ele.noUiSlider.set(val);
            }
        },

        computed: {

            id(){
                if (this.sid != undefined) {
                    return this.sid;
                } else {
                    return 'slider' + Math.ceil(Math.random() * 100);
                }
            },
            getChangeValue(){
                return this.value;
            },

            startValue(){
                if (this.sliderNumber != 2) {
                    return [this.initStart];
                } else {
                    return [this.initStart, this.initEnd];
                }
            },

            rangeValue(){
                if (this.sliderNumber == 2) {
                    return true;
                } else {
                    switch (this.rangeLight) {
                        case 0:
                            return [true, false];
                        case 1:
                            return [false, true];
                        default:
                            return [true, false];
                    }
                }
            }
        },

        created(){
            var _$ = this;
            _$.$nextTick(()=> {
                _$.$ele = document.getElementById(_$.id);
                _$.createSlider();
            })
        },

        methods: {
            createSlider(){
                var _$ = this;
                noUiSlider.create(_$.$ele, {
                    start: _$.startValue,
                    connect: _$.rangeValue,
                    range: {
                        'min': [_$.minValue],
                        'max': [_$.maxValue]
                    }
                });

                _$.addEvents();

            },

            addEvents (){
                var _$ = this;

                _$.events.forEach(function (v, k) {
                    _$.$ele.noUiSlider.on(v, function (a, b, c, d) {
                        _$.$emit(v, a, b, c, d);
                    });
                });

            },

        }
    }
</script>