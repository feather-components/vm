<template>
    <vm-mask :visible="true" :value="value">
        <overlay :visible="true" class="vm-iosselect" position="bottom">
            <div class="vm-iosselect-body">
                <header class="vm-iosselect-header">
                    <p class="cancel" @click="_hide()">取消</p>
                    <p class="sure" @click="_showVal">确定</p>
                </header>
                <ul class="vm-iosselect-list">
                    <li v-for="(item, index) in selectList" :style="{width: width + '%'}">
                        <scroll
                            @scroll:end="_activeChange($event, index)"
                            @drag:end="_dragStop"
                            @draging="_handleDraging($event, index)"
                            :ref="'scroll' + index"
                        >
                            <ul class='vm-iosselect-label-list'>
                                <li v-for="(it, i) in item " @click="_scrollTo(index, i, it)">
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
    import Scroll from '../scroll'
    import Overlay from '../overlay'
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
                selectList: this.source,
				dragIndex: 0,
                sed: []
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

        watch: {
            val (v) {
                this.$emit('input', v)
            },

            value (v) {
            	this.val = v
            }

        },

        mounted() {
            let l = this.selectList.length
            for (let i = 0; i < l; i++) {
            	this.sed.push(false)
                this.activeIndex.push(2)
            }


            this._initValRender()
                    ._getVal()
            this.$emit('change', {done:this._setList, val: this.val, index: null})

            this.activeIndex.forEach((v1, k1) => {
                this._renderList(k1)
                this.$nextTick(() => {
					this._initScrollTo(k1)
                })
            })

        },

        methods: {
        	_initScrollTo(index) {
				let $list = this.$refs['scroll' + index]

				$list[0].scrollTo('-' + (this.activeIndex[index] - 2) * LINEHEIGHT)
            },

            _renderList(index, stop) {
                let $list = this.$refs['scroll' + index]
                if ($list[0] == undefined) {
                	return
                }
                let $lis = $list[0].$el.querySelectorAll('li')

                //处理选择最后一个，change不能再次出发渲染和获取值的处理
				if (this.activeIndex[index] + 2 >= $lis.length) {
					this.activeIndex[index] = $lis.length - 3
                    this._getVal()
                }

                $lis.forEach((v, k) => {
                    if(this.activeIndex[index] === k) {
                        v.style.opacity = 1
                        v.style.color = '#7792cb'
                    } else if(Math.abs(this.activeIndex[index] - k) === 1){
                        v.style.opacity = 0.6
						v.style.color = '#000'
                    } else {
                        v.style.opacity = 0.3
						v.style.color = '#000';
                    }
                })

                if (stop === 1) {
					this.$emit('scrollEnd', index, this.val, (i, d) => {
						i.forEach((v, k) => {
						    if (this.sed[v]) return

						    this.sed[v] = true;

							this._scrollTo(v, d[k], {i: i})
							setTimeout(() => {
								this.sed[v] = false
							}, 650)
                        })
					})
				}

                return this
            },

            _initValRender() {
                let _self = this
                if (Object.prototype.toString.call(_self.value) != '[object Array]') {
					_self.value = []
                }

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


            _activeChange(pos, index, stop) {
                this.$emit('change', {done:this._setList, val: this.val, index: index})
				setTimeout(() => {
					stop != 0 && this._renderList(index, 1)
				}, 100)
            },

			_handleDraging(pos, i) {
				this.dragIndex = i
                this._activeChange(pos, i, 0)
            },

			_handleStop(des, status) {
				let topi = 0
				if (Math.abs(des) % LINEHEIGHT  > LINEHEIGHT / 2) {
					topi = Math.ceil( Math.abs(des) / LINEHEIGHT )
				} else {
					topi = Math.floor( Math.abs(des) / LINEHEIGHT )
				}

				this.activeIndex[this.dragIndex] = topi + 2
				this._getVal()
				this.$refs['scroll' + this.dragIndex][0].scrollTo('-' + topi * LINEHEIGHT, status = 1 ? 500 : 200)
			},

			_dragStop(pos, destination, duration) {
                if (destination != undefined) {
                    this._handleStop(destination, 1)
                } else {
                    this._handleStop(pos, 0)
                }
			},

            // 这里处理双向数据绑定不上的问题
            _bindVal() {
				let t = this.val
				this.val = []
				this.val  = t
            },

            _scrollTo(i, d, o) {
            	if (Object.keys(o).length == 0) {
                    return
                }
                this.activeIndex[i] = d
				this._getVal()
                this.$nextTick(() => {
					this.$refs['scroll' + i][0].scrollTo('-' + (d  - 2) * LINEHEIGHT, 500)
					this._renderList(i, 1)
				})
            },

            _showVal() {
                let val = []
                let val2 = []

                if (this.val == []) {
					this.source.forEach((v, k) => {
						this.val.push(v[0])
                    })
                }

                this.val.forEach((v, k) => {
                    val.push(v.label)
                    val2.push(v.value)
                })



				this._bindVal()
                this.$nextTick(() => {
					this.$emit('confirm', val2, val, this.val)
				})
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
    .vm-iosselect{
        position: fixed;
        left: 0;
        bottom:0;
        width:100%;
        /*height: 219px;*/
        background: rgba(0,0,0,0.5);
        z-index:10001;
        background: #f5f5f5;
    }
    .vm-iosselect-list{
        width:100%;
        height: 175px;
        overflow: hidden;
        padding-left:0;
        /*background: #fff;*/
    }
    .vm-iosselect-list > li{
        float: left;
        list-style: none;
        min-height: 175px;
        max-height: 175px;
    }
    .vm-iosselect-header{
        width:100%;
        height:44px;
        /*box-shadow: 0 2px 3px #ddd;*/
        background: #fff;
    }
    .vm-iosselect-header p{
        display: inline-block;
        padding:0 15px;
        line-height: 44px;
        font-size: 13px;
        margin:0;
    }
    .vm-iosselect-header .cancel{
        float: left;
        color:#ddd;
    }
    .vm-iosselect-header .sure{
        float: right;
        color: #7792cb
    }
    .vm-list > li {
        float: left;
        height:175px;
    }
    .vm-iosselect-label-list{
        padding-left: 0;
    }
    .vm-iosselect-label-list li{
        line-height:35px;
        height:35px;
        text-align: center;
        font-size: 13px;
        opacity: 0.3;
        list-style: none;
    }
</style>