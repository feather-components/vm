<style>
    .noUi-connect{
        background:#6281C2!important;
    }
    .noUi-target{
        background: #e1e1e1;
        border: 0;
        box-shadow: none;
    }
    .noUi-horizontal{
        height:3px;
        border-radius:1.5px;
    }
    .noUi-origin{
        top:-6px;
    }
    .noUi-horizontal .noUi-handle{
        width:24px;
        height:24px;
        border-radius:50%;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20);
    }
    .noUi-handle:before, .noUi-handle:after{
        display: none;
    }
</style>

<template>
    <div :id="id"></div>
</template>

<script>
    import Vue from 'vue';
    import noUiSlider from 'nouislider';

    export default{
        name:"slider",
        props:{
            /*id*/
            sid:{
                type:String,
                require:true
            },
            /*初始值*/
            initStart:{
                type:Number,
                require:true
            },
            initEnd:{
                type:Number,
                require:true
            },
            /*最小值*/
            minValue:{
                type:Number,
                require:true
            },
            /*最大值*/
            maxValue:{
                type:Number,
                require:true
            },
            /*是否为一个/两个滑块*/
            single:{
                type:Number,
                validator: val=> {
                    if([1,2].indexOf(val)>-1){  /*滑块个数1,2*/
                        return val;
                    }else{
                        return 1;
                    }
                }
            },

            /*connect*/
            connect:{
                type:Number,
                require:true,
                validator: val=> {
                    if([0,1,2].indexOf(val)>-1){  /*0:代表单滑块邹策高亮；1：代表单滑块右侧高亮；2：代表双滑块中间高亮*/
                        return val;
                    }else{
                        return 0;
                    }

                }
            },

            /*父元素手动设置*/
            changeValue:{
                type:Array
            }
        },

        data(){
            return {
                id:this.sid,
                $ele:"",
                min:this.minValue,
                max:this.maxValue,
                events:['update','slide','set','change','start','end'],  /*事件触发*/

            }
        },


        watch:{
            getChangeValue:function (val) {
                this.$ele.noUiSlider.set(val);
            }
        },

        computed:{
            getChangeValue(){
                return this.changeValue;
            },

            startValue(){
                if(this.single!=2){
                    return [this.initStart];
                }else{
                    return [this.initStart,this.initEnd];
                }
            },

            connectValue(){
                switch(this.connect){
                    case 0:
                        return [true, false];
                    case 1:
                        return [false, true];
                    case 2:
                        return true;
                }

            }
        },

        created(){
            var _$=this;
            new Promise((resolve,reject)=>{resolve()}).then(()=>{
                    _$.$ele=document.getElementById(_$.id);
                    _$.createSlider();
            })
        },

        methods:{
            createSlider(){
                var _$=this;
                noUiSlider.create(_$.$ele, {
                    start: _$.startValue,
                    connect:_$.connectValue,
                    range: {
                        'min': [ _$.minValue ],
                        'max': [ _$.maxValue ]
                    }
                });

                _$.addEvents();

            },

            addEvents (){
                var _$=this;

                _$.events.forEach(function(v,k){
                    _$.$ele.noUiSlider.on(v, function(a,b,c,d){
                        _$.$emit(v,a,b,c,d);
                    });
                });

            },

        }
    }
</script>