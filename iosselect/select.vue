<template>
    <div vmui-select>
        <overlay :visible="true" :class="className" position="bottom">
            <div class="vmui-select-body">
                <header class="vmui-select-header">
                    <p class="cancel">取消</p>
                    <p class="sure">确定</p>
                </header>
                <ul class="vmui-list">
                    <li v-for="(item, index) in selectList" :style="{width:width+'%'}">
                        <scroll @scroll:end="scrollStop($event,index)" @drag:end="scrollStop($event,index)" :ref="'scroll' + index">
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
        text-align: center;
        font-size: 13px;
        /*opacity: 0.1;*/
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
                    return  [
                        [
                            {label: '1', value: 1},
                            {label: '2', value: 2},
                            {label: '3', value: 3},
                            {label: '4', value: 4},
                            {label: '5', value: 5},
                            {label: '6', value: 6},
                            {label: '7', value: 7},
                            {label: '8', value: 8},
                            {label: '9', value: 8},
                            {label: '10', value: 10},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                            {label: '11', value: 11},
                        ],
                        [
                            {label: '1', value: 1},
                            {label: '2', value: 2},
                            {label: '3', value: 3},
                            {label: '4', value: 4},
                            {label: '5', value: 5},
                            {label: '6', value: 6},
                            {label: '7', value: 7},
                            {label: '8', value: 8},
                            {label: '9', value: 8},
                            {label: '10', value: 10},
                            {label: '11', value: 11},
                        ]
                    ]
                }
            }
        },

        components: {
            Scroll,
            Overlay
        },

        data () {
            return {
                activeIndex: 0,
                scrollIndex: 0
            }
        },

        computed: {
            className(){
                return ('vmui-select ' + (this.class || '')).trim()
            },

            width () {
                return 100 / this.selectList.length
            }
        },

        mounted() {
            document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        },

        methods: {
            scrollStop(pos, index) {
                console.log(pos)
                let topi
                if (Math.abs(pos) % LINEHEIGHT  > LINEHEIGHT / 2) {
                    topi = Math.ceil( Math.abs(pos) / LINEHEIGHT )
                } else {
                    topi = Math.floor( Math.abs(pos) / LINEHEIGHT )
                }
                this.activeIndex = topi + 3
                console.log(this.$refs['scroll' + index],index,this.activeIndex,topi * LINEHEIGHT, 9992)
                this.$refs['scroll' + index][0].scrollTo('-' + topi * LINEHEIGHT)
//                Scroll.scrollTo(topi * LINEHEIGHT)
            }
        }
    }
</script>