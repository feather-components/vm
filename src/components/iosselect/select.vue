<template>
    <div vmui-select>
        <overlay :visible="true" :class="className" position="bottom">
            <div class="vmui-select-body">
                <header class="vmui-select-header">
                    <p class="cancel" @click="_hideSelect">取消</p>
                    <p class="sure" @click="_showVal">确定</p>
                </header>
                <ul class="vmui-select-list">
                    <li v-for="(item, index) in selectList" :style="{width:width+'%'}">
                        <scroll @scroll:end="_scrollStop($event,index)"  @draging="_scrolling($event,index)"
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
    .vmui-select-list{
        width:100%;
        height: 175px;
        overflow: hidden;
    }
    .vmui-select-list > li{
        float: left;
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

            connectEvents: {
                type: Array
            },

            autoFill: {
                type: Boolean,
                default: true
            }
        },

        components: {
            Scroll,
            Overlay
        },

        data () {
            return {
                activeIndex: [],
//                scrollIndex: 0,
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

        beforeMount() {
            this._addNullForList()
        },

        mounted() {
            document.getElementsByTagName('body')[0].style.overflow = 'hidden'
            let l = this.selectList.length
            for (let i = 0; i < l; i++) {
                this.activeIndex.push(2)
            }

            this._getVal()
            this._renderListVal()
            this._renderList()

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

            _removeNullForList() {
                this.selectList = this.selectList.map((v, k) => {
                    v = v.filter((v1, k) => {
                        return Object.keys(v1).length != 0
                    })
                    return v
                })
            },

            _addNullForList() {
                this._removeNullForList()

                this.selectList.forEach((v, k) => {
                    this.selectList[k].unshift({}, {})
                    this.selectList[k].push({}, {})
                })
            },

            _getVal(){
                let l = this.activeIndex.length
                for (let i = 0; i < l; i++) {
                    this.val[i] = this.selectList[i][this.activeIndex[i]]
                }
            },

            _scrolling(pos, index) {
                let topi

                if (Math.abs(pos) % LINEHEIGHT  > LINEHEIGHT / 2) {
                    topi = Math.ceil( Math.abs(pos) / LINEHEIGHT )
                } else {
                    topi = Math.floor( Math.abs(pos) / LINEHEIGHT )
                }

                this.activeIndex[index] = topi + 2
                this.$refs['scroll' + index][0].scrollTo('-' + topi * LINEHEIGHT)

                this._getVal()
                this._renderList()
            },

            _scrollStop(pos, index) {
                this._scrolling(pos, index)
                this._renderListVal(index)
            },


            _hideSelect() {
                this.$destroy()
            },

            _showVal() {

                let val = []

                this.val.forEach((v, k) => {
                    val.push(v.label)
                })

                if (this.autoFill) {
                    if (this.bindEl.tagName === 'INPUT' ) {
                        if (['number','text'].indexOf(this.bindEl.getAttribute('type')) > -1) {
                            this.bindEl.setAttribute('value', val.join(this.connect))
                        } else {
                            return
                        }
                    } else {
                        this.bindEl.innerHTML = val.join(this.connect)
                    }
                }

                this.onSure(this.val)
                this.$destroy()
            },

            _setList(list, i) {
                this.$set(this.selectList, i, list)
                this._addNullForList()
            },

            _renderListVal(index) {
                if (this.connectEvents &&　this.connectEvents　instanceof Array){
                    this.connectEvents.forEach((v, k) => {
                        if (v.connectPrev == index) {
                            try {
                                v.callback(this.val, v.connectPrev, v.connectNext, this._setList)
                            } catch (e) {
                                return false
                            }
                        } else return
                    })
                }
            }

        }
    }
</script>