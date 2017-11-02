<template>
    <div class="vm-component-slide" ref="parentContent" v-cloak>
        <div class="vm-slide-folder" ref="contentBox" v-draggable="{axis: axis, canDrag: canDrag}">
            <slot></slot>
        </div>
    </div>  
</template>

<style>
    .vm-component-slide{
        overflow: hidden;
        position: relative;
    }
    .vm-slide-folder{
        height: 100%;
        margin: 0 auto;
    }
    .vm-slide-folder:after{
        content: "";
        display: block;
        height: 0px;
        overflow: hidden;
        clear: both;
    }
</style>

<script>
    import Grid from '../grid/grid';
    import Draggable from '../../directives/draggable';
    import {Event, Dom} from '../../helper';

    export default {
        components: {
            Grid
        },

        directives: {
            Draggable
        },

        props: {
            offset: {
                type: Number,
                default: 0.25
            },
            vertical: {
                type: Boolean,
                default: false
            },
            axis: {
                type: String,
                default: 'y'
            },
            loop: {
                type: Boolean,
                default: true
            },
            auto: {
                type: Boolean,
                default: false
            },
            firstPage: {
                type: Number,
                default: 1
            }

        },

        data(){
            return {
                dragEnd: true,
                min: 0,
                size: 0,
                index: 0,
                parentHeight: 0,
                parentWidth: 0,
                scrollTime: 300,
                parentOffsetLeft: 0,
                parentOffsetTop: 0,
            };
        },

        mounted(){
            //初始化
            this.parentHeight = Dom.height(this.$refs.parentContent);
            this.parentWidth = Dom.width(this.$refs.parentContent);
            this.parentOffsetLeft = Dom.offset(this.$refs.parentContent).left;
            this.parentOffsetTop = Dom.offset(this.$refs.parentContent).top;

            //要轮播，则添加dom
            this.loop && this.initDom();
            this.initCss();
            this.$nextTick(() => {
                Event.on(this.$refs.contentBox, 'drag:start', this.onDragStart);
                Event.on(this.$refs.contentBox, 'drag:end', this.onDragEnd);
                Event.on(this.$refs.contentBox, 'draging', this.onDraging);
                Event.on(this.$refs.contentBox, 'transitionend webkitTransitionEnd', () => {
                    this.$emit('switch:complete', this.index);
                });


                //默认滚动到某一页
                if(this.loop){
                    this.to(this.firstPage + 1, 0);
                }else{
                    this.to(this.firstPage, 0);
                }
            });
        },

        methods: {
            initDom(){
                this.$refs.contentBox.insertBefore(this.$refs.contentBox.lastElementChild.cloneNode(true),this.$refs.contentBox.childNodes[0]);
                this.$refs.contentBox.appendChild(this.$refs.contentBox.childNodes[1].cloneNode(true));
            },
            initCss(){
                let float = "none";
                if(this.axis == 'x'){
                    Dom.css(this.$refs.contentBox, {width:this.$refs.contentBox.children.length*this.parentWidth});
                    float = 'left';
                }else{
                    Dom.css(this.$refs.contentBox, {height:this.$refs.contentBox.children.length*this.parentHeight});
                }
                let temp = this.$refs.contentBox.children;
                for(let i=0; i<temp.length; i++){
                    if(temp[i].nodeType !=3) Dom.css(temp[i],{height:this.parentHeight,width:this.parentWidth,"float":float});
                }
            },
            onDragStart(event){
                console.log(event,'start');
                this.dragEnd = false;
                this.min =  this.axis == 'x' ? -(this.$refs.contentBox.children.length - 1) * this.parentWidth : -(this.$refs.contentBox.children.length - 1) * this.parentHeight;
                this.size = this.$refs.contentBox.children.length;
                this.$emit('drag:start');
            },

            onDraging(event){
                this.$emit('draging', event);
            },

            onDragEnd(event){
                let start,end,moved,index
                if(this.axis == 'x'){
                    start = -(Dom.offset(this.$refs.contentBox.children[this.index]).left - this.parentOffsetLeft);
                    end = event.data.x;
                    moved = end - start;
                    index = this.index + (Math.abs(moved)/this.parentWidth < 0.33 ? 0 : moved > 0 ? -1 : 1);
                }else{
                    start = -(Dom.offset(this.$refs.contentBox.children[this.index]).top - this.parentOffsetTop);
                    end = event.data.y;
                    moved = end - start;
                    console.log(start,end,'end');
                    index = this.index + (Math.abs(moved)/this.parentWidth < 0.33 ? 0 : moved > 0 ? -1 : 1);
                }
                this.$emit('drag:end');                
                this.dragEnd = true;
                this.to(index,1);
            },

            to(index,fig){
                Dom.css(this.$refs.contentBox, this.get_style(index,fig));


                if(index == this.index){
                    this.$emit('reject', this.index);
                }else{    
                    this.$emit('switch', this.index = index, this.index);
                }
                this.canDrag = false;
                window.setTimeout(()=>{
                    this.canDrag = true;
                    this.loop && this.scrollEnd();
                },this.scrollTime);
                
            },
            scrollEnd(){
                if(this.index == 0){
                    this.index = this.size-2;
                    this.to(this.index,0);
                }else if(this.index == this.size -1){
                    this.index = 1;
                    this.to(this.index,0);
                }
            },
            get_style(index,fig){
                let self = this,x,time = fig==1?this.scrollTime:0;
                if(this.axis == 'x'){
                    x = -(Dom.offset(this.$refs.contentBox.children[index]).left-this.parentOffsetLeft);
                    return {
                        '-webkit-transition':'-webkit-transform '+time+'ms',
                        '-webkit-transform':'translate3d('+x+'px,0,0)',

                        'transition':'transform '+time+'ms',
                        'transform':'translate3d('+x+'px,0,0)'
                    };
                }else{
                    x = -(Dom.offset(this.$refs.contentBox.children[index]).top - this.parentOffsetTop);
                    return {
                        '-webkit-transition':'-webkit-transform '+time+'ms',
                        '-webkit-transform':'translate3d(0,' + x + 'px,0)',

                        'transition':'transform '+time+'ms',
                        'transform':'translate3d(0,' + x + 'px,0)'
                    };
                }
            },
            canDrag(info){
                if(this.axis == 'x'){
                    return info.x > this.min && info.x < 0;
                }else{
                    return info.y > this.min && info.y < 0;
                }
            }
        }
    }
</script>