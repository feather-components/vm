<template>
    <div vmui-select>
        <overlay :visible="true" :class="className" position="bottom">
            <div class="vmui-select-body">
                <header class="vmui-select-header">
                    <p class="cancel" @click="_hideSelect">取消</p>
                    <p class="sure" @click="_showVal">确定</p>
                </header>
                <ul class="vmui-list">
                    <li v-for="(item, index) in selectList" :style="{width:width+'%'}">
                        <scroll @scroll:end="_scrollStop($event,index)"  @draging="_scrollStop($event,index)"
                                @drag:end="_scrollStop($event,index)" :ref="'scroll' + index">
                            <ul class='vmui-select-label-list'>
                                <li v-for="(it, i) in item ">
                                    {{it.label}}
                                </li>
                            </ul>
                        </scroll>
                    </li>
                </ul>
            </div>
        </overlay>
    </div>
</template>
<style>
    [vmui-select]{
        position: fixed;
        left: 0;
        top:0;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.5);
        z-index:100
    }
    .vmui-select{
        width:100%;
        background: #fff;
    }
    .vmui-select-header{
        width:100%;
        height:44px;
    }
    .vmui-select-header p{
        display: inline-block;
        padding:0 15px;
        line-height: 44px;
        font-size: 13px;
    }
    .vmui-select-header .cancel{
        float: left;
        color:#e1e1e1;
    }
    .vmui-select-header .sure{
        float: right;
        color: #ff8447
    }
    .vmui-list > li {
        float: left;
        height:175px;
    }
    .vmui-select-label-list li{
        line-height:35px;
        height:35px;
        text-align: center;
        font-size: 13px;
        opacity: 0.3;
    }

</style>
<script>
    import Scroll from '../scroll'
    import Overlay from '../overlay'
    const LINEHEIGHT = 35


    export default {
        mixins: [Overlay],
        props: {
            selectList: {
                type: Array,
                default() {
                    return  []
                }
            },

            bindEl: {
                type: null
            },

            connect: {
                type: String,
                default: '/'
            },

            onSure: {
                type: Function
            },

            loopEvent: {
                type: Function
            }
        },

        components: {
            Scroll,
            Overlay
        },

        data () {
            return {
                activeIndex: [],
                scrollIndex: 0,
                val: []
            }
        },

        computed: {
            className(){
                return ('vmui-select ' + (this.class || '')).trim()
            },

            width () {
                return 100 / this.selectList.length
            },

//            val() {
//                let [va, l] = [[], this.activeIndex.length]
//                for (let i = 0; i < l; i++) {
//                    va[i] = this.selectList[i][this.activeIndex]
//                }
//                console.log(va, 9898)
////                va[this.scrollIndex] = this.selectList[this.scrollIndex][this.activeIndex]
//                return va
//            }
        },

        destroyed() {
            document.body.removeChild(document.querySelector('[vmui-select]'))
        },

        mounted() {
            document.getElementsByTagName('body')[0].style.overflow = 'hidden'
            let l = this.selectList.length
            for (let i = 0; i < l; i++) {
                this.activeIndex.push(2)
            }

            this._getVal()
            this._renderList()
            this._renderListVal()

        },

        methods: {
            _renderList() {
                this.activeIndex.forEach((v1, k1) => {
                    let $list = this.$refs['scroll' + k1]
                    let $lis = $list[0].$el.querySelectorAll('li')

                    $lis.forEach((v, k) => {
                        if(v1 === k) {
                            v.style.opacity = 1
                        } else if(Math.abs(v1 - k) === 1){
                            v.style.opacity = 0.6
                        } else {
                            v.style.opacity = 0.3
                        }
                    })
                })
            },

            _getVal(){
                let l = this.activeIndex.length
                for (let i = 0; i < l; i++) {
                    this.val[i] = this.selectList[i][this.activeIndex[i]]
                }
            },

            _scrollStop(pos, index) {
                let topi

                if (Math.abs(pos) % LINEHEIGHT  > LINEHEIGHT / 2) {
                    topi = Math.ceil( Math.abs(pos) / LINEHEIGHT )
                } else {
                    topi = Math.floor( Math.abs(pos) / LINEHEIGHT )
                }

                this.activeIndex[index] = topi + 2
//                this.$refs['scroll' + index][0].scrollTo('-' + topi * LINEHEIGHT)

                this._getVal()
                this._renderList()
            },


            _hideSelect() {
                this.$destroy()
            },

            _showVal() {

                let val = []

                this.val.forEach((v, k) => {
                    val.push(v.label)
                })

                if (this.bindEl.tagName === 'INPUT' ) {
                    if (['number','text'].indexOf(this.bindEl.getAttribute('type')) > -1) {
                        this.bindEl.setAttribute('value', val.join(this.connect))
                    } else {
                        return
                    }
                } else {
                    this.bindEl.innerHTML = val.join(this.connect)
                }

                this.onSure(this.val)
                this.$destroy()
            },

            _renderListVal() {
                // if (this._options.isLoopEvent) {
                // setInterval(() => {
                // 	console.log(this._options.selectList)
                // }, 50)
                // }
                if (this.loopEvent){
                    let count = 20
                    let t = setInterval(() => {
//                        this.$set(this.selectList,1, this.loopEvent(count))
                         this.selectList[1] = this.loopEvent(count)
                        this.$forceUpdate()
                        count++
//                        console.log(this.selectList, 64646)
                    }, 5000)
                }
            }

        }
    }
</script>