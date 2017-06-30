<template>
    <vm-mask :visible="true">
        <overlay :visible="true" class="vmui-select" position="bottom">
            <div class="vmui-select-body">
                <header class="vmui-select-header">
                    <p class="cancel" @click="_hide()">取消</p>
                    <p class="sure" @click="_showVal">确定</p>
                </header>
                <ul class="vmui-select-list">
                    <li v-for="(item, index) in selectList" :style="{width:width+'%'}">
                        <scroll @scroll:end="_activeChange($event,index, true)" @drag:end="_dragStop($event,index)"
                                @draging="_activeChange($event,index, false)" :ref="'scroll' + index">
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
    </vm-mask>
</template>

<script>
    import Scroll from '../../components/scroll'
    import Overlay from '../../components/overlay'
    import vmMask from '../mask';
    const LINEHEIGHT = 35

    export default {
        mixins: [Overlay],

        props: {
            source: {
                type: Array,
                default() {
                    return  []
                }
            },

            connectEvents: {
                type: Array
            },

            value: {
                type: Array,
                default() {
                    return []
                }
            }
        },

        components: {
            Scroll,
            Overlay,
            vmMask
        },

        data () {
            return {
                activeIndex: [],
                val: [],
                selectList: this.source
            }
        },

        computed: {
            width () {
                return 100 / this.selectList.length
            }
        },

        beforeMount() {
            this._addNullForList()
        },

        mounted() {
            let l = this.selectList.length
            for (let i = 0; i < l; i++) {
                this.activeIndex.push(2)
            }

            this._initValRender()
                    ._getVal()
            this.$emit('change', {done:this._setList, val: this.val})

            this.activeIndex.forEach((v1, k1) => {
                this._renderList(true, k1)
            })
        },

        methods: {
            _renderList(stop, index, dragend) {
                let $list = this.$refs['scroll' + index]
                let $lis = $list[0].$el.querySelectorAll('li')
                if (stop) {
                    $list[0].scrollTo('-' + (this.activeIndex[index]  - 2) * LINEHEIGHT)
                }
                if (dragend) {
                    setTimeout(() => {
                        $list[0].scrollTo('-' + (this.activeIndex[index]  - 2) * LINEHEIGHT)
                    }, 100)
                }

                $lis.forEach((v, k) => {
                    if(this.activeIndex[index] === k) {
                        v.style.opacity = 1
                    } else if(Math.abs(this.activeIndex[index] - k) === 1){
                        v.style.opacity = 0.6
                    } else {
                        v.style.opacity = 0.3
                    }
                })
                return this
            },

            _initValRender() {
                let _self = this

                _self.value.forEach((v, k) => {
                    _self.selectList[k].forEach((v1, k1) => {
                        if(v1.value == v) {
                            _self.activeIndex[k] = k1
                        }
                    })
                })

                return _self
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
                return this
            },

            _scrolling(pos, index) {
                let topi = 0

                if (Math.abs(pos) % LINEHEIGHT  > LINEHEIGHT / 2) {
                    topi = Math.ceil( Math.abs(pos) / LINEHEIGHT )
                } else {
                    topi = Math.floor( Math.abs(pos) / LINEHEIGHT )
                }

                this.activeIndex[index] = topi + 2

                this._getVal()
            },

            _activeChange(pos, index, status) {
                this._scrolling(pos, index)
                this.$emit('change', {done:this._setList, val: this.val})
                this.$nextTick(() => {
                    this._renderList(status, index)
                })
            },


            _dragStop(pos, index) {
                this._scrolling(pos, index)
                this.$nextTick(() => {
                    this._renderList(false, index, true)
                })
            },

            _showVal() {
                let val = []

                this.val.forEach((v, k) => {
                    val.push(v.label)
                })

                this.$emit('confirm', this.val)
            },

            _setList(list, i) {
                this.$set(this.selectList, i, list)
                this._addNullForList()
            },

            _hide() {
                this.$emit('close')
            }
        }
    }
</script>

<style>
    .vmui-select{
        position: fixed;
        left: 0;
        bottom:0;
        width:100%;
        /*height: 219px;*/
        background: rgba(0,0,0,0.5);
        z-index:10001
    }
    .vmui-select-list{
        width:100%;
        height: 175px;
        overflow: hidden;
        padding-left:0;
        background: #fff;
    }
    .vmui-select-list > li{
        float: left;
        list-style: none;
        min-height: 175px;
    }
    .vmui-select{
        width:100%;
        background: #fff;
    }
    .vmui-select-header{
        width:100%;
        height:44px;
        box-shadow: 0 2px 3px #ddd;
    }
    .vmui-select-header p{
        display: inline-block;
        padding:0 15px;
        line-height: 44px;
        font-size: 13px;
        margin:0;
    }
    .vmui-select-header .cancel{
        float: left;
        color:#ddd;
    }
    .vmui-select-header .sure{
        float: right;
        color: #ff8447
    }
    .vmui-list > li {
        float: left;
        height:175px;
    }
    .vmui-select-label-list{
        padding-left: 0;
    }
    .vmui-select-label-list li{
        line-height:35px;
        height:35px;
        text-align: center;
        font-size: 13px;
        opacity: 0.3;
        list-style: none;
    }
</style>