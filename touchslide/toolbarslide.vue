<style>
    .vmui-toolbarslide-overlay{
        width: 100%;
    }
    .vmui-toolbarslide-imgbox{
        position: relative;
    }
    .vmui-toolbarslide-imgbox .vmui-toolbarslide-ul,li{
        margin:0;
        padding:0;
    }
    div.vmui-toolbarslide-imgbox{
        width:100%;
        height:100%;
        overflow:hidden;
        margin:0 auto;
    }
    div.vmui-toolbarslide-imgbox .vmui-toolbarslide-ul{
        clear:both;
        overflow: hidden;
        height: 100% !important;
    }
    div.vmui-toolbarslide-imgbox .vmui-toolbarslide-ul::after{
        display: block;
        content: "";
        height: 0;
        overflow: hidden;
        clear:both;
    }
    div.vmui-toolbarslide-imgbox .vmui-toolbarslide-ul li{
        float:left;
        width: 100%;
        height:100%;
        overflow:hidden;
        text-align:center;
        margin: auto 0;
    }
    a.vmui-toolbarslide-a{
        margin: 0 !important;
        padding: 0 !important;
    }
    #page{color:red;}
    .vmui-toolbarslide-tags{
        position: absolute;
        bottom: 9%;
        width: 100%;
        text-align: center;
    }
    .vmui-toolbarslide-tag{
        display: inline-block;
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 100%;
        background: #fff;
        margin-left: 6px;
    }
    .vmui-toolbarslide-tag.active{
        opacity: .2;
    }
    .vmui-toolbarslide-count{
        position: absolute;
        bottom: 9%;
        right: 20px;
    }
    .vmui-toolbarslide-countshow{
        font-size: 14px;
        color: #fff;
    }
</style>

<template>
    <div class="vmui-toolbarslide-imgbox" ref="imgbox_content">
        <ul ref="imgbox" v-on:touchstart="touchstart" v-on:touchmove="touchmove" v-on:touchend="touchend" class="vmui-toolbarslide-ul">
            <li v-for="(item, index) in imgs" @click="$emit('imgclick',index)">
                <a href="#" class="vmui-toolbarslide-a"><img ref="img" v-bind:src="item.src" /></a>
            </li>
        </ul>
        <div class="vmui-toolbarslide-tags" v-if="needTag">
            <span class="vmui-toolbarslide-tag" v-for="(item, i) in imgs" :class="{'active':(i == index)}"></span>
        </div>
        <div class="vmui-toolbarslide-count" v-if="needTotal">
            <span class="vmui-toolbarslide-countshow" v-text="(index+1) + ' / ' + size"></span>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Shade from '../shade';
    import Overlay from '../overlay';
    import _ from '../helper';

    export default{
        name:"toolbarslide",
        components: {
            Overlay,
            Shade
        },
        props:{
            needTag:{
                type:Boolean,
                default:false,
            },
            needTotal:{
                type:Boolean,
                default:false,
            },
            imgs: {
                type: Array,
                default: []
            },
            loop:{
                type: Boolean,
                default:true,
            },
            auto:{
                type: Boolean,
                default:false,
            },
            useShade:{
                type: Boolean,
                default:true,
            },
            // height:{
            //     type: Number,
            //     default:0,
            // }
        },
        data(){
            return {
                visible:true,
                className: "vmui-touchslide-overlay",
                contentWith: "",
                width:0,
                size:0,
                scroll_time: 300,//图片滚动时长
                auto_wait_time:3000,//轮播间隔
                maxleft: 0,//最大lfet值[不循环情况下的值
                now_left: 0, //初始位置信息[不循环情况下的值]
                point_x: null, //记录一个x坐标
                point_y: null, //记录一个y坐标
                move_left: false, //记录向哪边滑动
                index: 0,
                busy: false,
                timer: null,
                height:0
            }
        },

        mounted(){
            this.init();
        },
        methods:{
            init(){
                let h = _.height(this.$el);
                this.height = h;
                _.css(this.$refs.imgbox_content,{
                    height:h,
                });
                this.width = _.width(document);
                let height = _.height(this.$el);
                this.size = this.imgs.length;
                _.css(this.$refs.imgbox,{
                    width:this.width * this.size,
                });
                
                this.init_loop();
                for(let index in this.$refs.imgbox.getElementsByTagName("img")){
                    console.log(this.$refs.imgbox.getElementsByTagName("img")[index]);
                    // this.$refs.imgbox.getElementsByTagName("img")[index].setAttribute("width",this.width + 'px');
                    // this.$refs.imgbox.getElementsByTagName("img")[index].setAttribute("height",this.height + 'px');
                    // this.$refs.imgbox.getElementsByTagName("img")[index].style.width = this.width + 'px';
                    // this.$refs.imgbox.getElementsByTagName("img")[index].style.height = height + 'px';
                    // index.width = this.width;
                    // index.height = height;
                }
                this.auto_scroll();
            },
            //返回当前页数
            callfun(index){
                this.$emit('nowpage',index);
            },
            auto_scroll : function(){//自动滚动
                var self = this;
                if(!self.loop || !self.auto)return;
                clearTimeout(self.timer);
                self.timer = setTimeout(function(){
                    self.go_index(self.index+1);
                },self.auto_wait_time);
            },
            setWidth(obj){
                if(obj){
                    for(let i=0; i<obj.length; i++){
                        _.css(obj[i],{
                            'width':this.width,
                            'height':this.height
                        });

                        _.css(obj[i].childNodes[0].childNodes[0],{
                            'width':this.width,
                            'height':this.height
                        })
                    }
                }
            },
            /*
             初始化循环滚动,当一次性需要滚动多个子元素时，暂不支持循环滚动效果,
             如果想实现一次性滚动多个子元素效果，可以通过页面结构实现
             循环滚动思路：复制首尾节点到尾首
             */
            init_loop(){
                let self = this;
                if(this.$refs.imgbox.children.length == this.size && this.loop){//暂时只支持size和子节点数相等情况的循环
                    this.now_left = -this.width;//设置初始位置信息
                    this.minleft = -this.width * this.size;//最小left值
                    this.maxleft = -this.width;
                    // console.log(this.$refs.imgbox.childNodes[0]);
                    this.$refs.imgbox.insertBefore(this.$refs.imgbox.childNodes[this.size-1].cloneNode(true),this.$refs.imgbox.childNodes[0]);
                    this.$refs.imgbox.appendChild(this.$refs.imgbox.childNodes[1].cloneNode(true));
                    _.css(this.$refs.imgbox,this.get_style(2));
                    _.css(this.$refs.imgbox,{
                        'width':this.width*(this.size+2)
                    });
                }else{
                    this.loop = false;
                    _.css(this.$refs.imgbox,{
                        'width': this.width * this.size
                    });
                }
                this.setWidth(this.$refs.imgbox.childNodes);
            },
            touchstart(e){
                let self = this;
                if(e.touches.length==1 && !self.busy){
                    self.point_x = e.touches[0].screenX;
                    self.point_y = e.touches[0].screenY;
                }
            },
            touchmove(e){
                let self = this;
                if(e.touches.length==1 && !self.busy){
                    return self.move(e.touches[0].screenX,e.touches[0].screenY);//这里根据返回值觉得是否阻止默认touch事件
                }
            },
            touchend(e){
                let self = this;
                !self.busy && self.move_end();
            },
            move(point_x,point_y){//滑动屏幕处理函数
                let self = this;
                let changeX = point_x - (this.point_x===null?point_x:this.point_x),
                    changeY = point_y - (this.point_y===null?point_y:this.point_y),
                    marginleft = this.now_left, return_value = false,
                    sin =changeY/Math.sqrt(changeX * changeX + changeY * changeY);
                this.now_left = marginleft+changeX;
                this.move_left = changeX<0;
                if(sin > Math.sin(Math.PI/3) || sin<-Math.sin(Math.PI/3)){//滑动屏幕角度范围：PI/3  -- 2PI/3
                    return_value = true;//不阻止默认行为
                }
                this.point_x = point_x;
                this.point_y = point_y;
                _.css(this.$refs.imgbox,this.get_style(2));
                return return_value;
            },
            move_end(){
                let self = this;
                let changeX = this.now_left % this.width,ind;
                if(this.now_left < this.minleft){//手指向左滑动
                    ind = this.index +1;
                }else if(this.now_left>this.maxleft){//手指向右滑动
                    ind = this.index-1;
                }else if(changeX!=0){
                    if(this.move_left){//手指向左滑动
                        ind = this.index+1;
                    }else{//手指向右滑动
                        ind = this.index-1;
                    }
                }else{
                    ind = this.index;
                }
                this.point_x = this.point_y = null;
                this.go_index(ind);
            },
            go_index(ind){//滚动到指定索引页面
                var self = this;
                if(self.busy)return;
                clearTimeout(self.timer);
                self.busy = true;
                if(self.loop){//如果循环
                    ind = ind<0?-1:ind;
                    ind = ind>self.size?self.size:ind;
                }else{
                    ind = ind<0?0:ind;
                    ind = ind>=self.size?(self.size-1):ind;
                }
                if(!self.loop && (self.now_left == -(self.width*ind))){
                    self.complete(ind);
                }else if(self.loop && (self.now_left == -self.width*(ind+1))){
                    self.complete(ind);
                }else{
                    if(ind == -1 || ind == self.size){//循环滚动边界
                        self.index = ind==-1?(self.size-1):0;
                        self.now_left = ind==-1?0:-self.width*(self.size+1);
                    }else{
                        self.index = ind;
                        self.now_left = -(self.width*(self.index+(self.loop?1:0)));
                    }
                    _.css(this.$refs.imgbox,this.get_style(1));
                    //self.box.css(this.get_style(1));
                    setTimeout(function(){
                        self.complete(ind);
                    },self.scroll_time);
                }
            },
            complete(ind){//动画完成回调
                var self = this;
                self.busy = false;
                self.callfun(self.index);
                if(ind==-1){
                    self.now_left = self.minleft;
                }else if(ind==self.size){
                    self.now_left = self.maxleft;
                }
                _.css(this.$refs.imgbox,this.get_style(2));
                //self.box.css(this.get_style(2));
                self.auto_scroll();
            },
            /*
             获取动画样式，要兼容更多浏览器，可以扩展该方法
             @int fig : 1 动画 2  没动画
             */
            get_style(fig){
                let self = this;
                let x = this.now_left,
                    time = fig==1?this.scroll_time:0;
                return {
                    '-webkit-transition':'-webkit-transform '+time+'ms',
                    '-webkit-transform':'translate3d('+x+'px,0,0)',
                    '-webkit-backface-visibility': 'hidden',
                    'transition':'transform '+time+'ms',
                    'transform':'translate3d('+x+'px,0,0)'
                };
            },
            shadeHide(e){
                this.visible = false;
            },
            stopPropaga(e){
                e.stopPropagation();
            }
        }
    }
</script>