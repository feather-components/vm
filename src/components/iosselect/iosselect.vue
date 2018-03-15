<template>
    <vm-mask :visible="visibility" :value="value">
        <overlay :visible="visibility" class="vm-iosselect" position="bottom">
            <div class="vm-iosselect-header">
                <a href="javascript:" class="vm-iosselect-cancel" @click="close">取消</a>
                <a href="javascript:" class="vm-iosselect-confirm" @click="confirm">确定</a>
            </div>

            <div class="vm-iosselect-scroll-list">
                <scroll class="vm-iosselect-scroll" v-for="(data, index) in dataList" style="height: 100%;" ref="scrolls"
                    @hook:mounted="listen(index)"
                >
                    <div class="vm-iosselect-scroll-inner">
                        <a href="javascript:" 
                            v-for="(item, i) of data" 
                            @click="select(item, i, index)"
                            :class="{'vm-iosselect-selected': vals[index] && item.value === vals[index].value}"
                        >
                            {{item.label}}
                        </a>
                    </div>
                </scroll>
            </div>
        </overlay>
    </vm-mask>
</template>

<script>
    import Scroll from '../scroll'
    import Overlay from '../overlay'
    import vmMask from '../mask';
    import {Util, Dom} from '../../helper';
    import Ajax from 'ajax';

    let div = Dom.create('<div style="height: .35rem; position: absolute;top: -100px;">');
    let HEIGHT;
    document.body.appendChild(div);

    setTimeout(() => {
        HEIGHT = div.offsetHeight;
        div.parentNode.removeChild(div);
    }, 100);

    export default {
        name: 'iosselect',

        mixins: [Overlay],

        props: {
            source: {
                type: [Array, String],
                default(){
                    return [];
                }
            },

            params: {
                type: [Array, Object],
                default(){
                    return {}
                }
            },

            value: {
            	type: Array,
				default(){
					return []
				}
            },

            dataFormatter: {
                type: Function,
                default(v){
                    return v;
                }
            },

            visible: {
                type: Boolean,
                default: true
            }
        },

        components: {
            Scroll,
            Overlay,
            vmMask
        },

        data(){
            return {
                data: [],
                dataList: [],
                vals: [],
                val: this.value
            }
        },

        watch: {
            val(v){
                this.$emit('input', v);
            },

            value(v){
                v = Util.makeArray(v);

                if(v.toString() === this.val.toString()){
                    return false;
                }

            	this.val = v;
            },

            source(source){
                this.render(source);
            }
        },

        mounted(){
            this.source.length > 1 && this.render();
        },

        methods: {
            render(source = this.source){
                source = Util.makeArray(source);
                var params = Util.makeArray(this.params);

                if(!Array.isArray(source[0]) && typeof source[0] != 'string'){
                    source = [source];
                }

                let promises = source.map((item, key) => {
                    if(typeof item == 'string'){
                        return new Promise((resolve) => {
                            Ajax({
                                url: item,
                                data: params[key] || params[0],
                                dataType: 'json',
                                success: resolve
                            });
                        });
                    }else{
                        return item;
                    }
                });


                Promise.all(promises).then((source) => {
                    let data = source.map(this.dataFormatter);
                    this.$emit('data:ready', data);

                    let i = 0, j = 0;

                    for(; i < data.length; i++){
                        if(this.data[i] != data[i]){
                            j = i;
                            break;
                        }
                    }

                    this.data = data;                    
                    this.renderList(this.data[j], j);
                });
            },

            renderList(data, level){
                this.dataList.splice(level, 1, data);

                if(!data.length) return false;

                let select = [data[0], 0, level];

                for(let i = 0; i < data.length; i++){
                    if(data[i].value == this.val[level]){
                        select = [data[i], i, level];
                        break;
                    }
                }

                setTimeout(() => this.select(...select), 10);
            },

            select(data, index, level, duration){
                let $scroll = this.$refs.scrolls[level];

                $scroll.scrollTo(-HEIGHT * index, duration || 400);
                this.vals.splice(level, 100000, data);
                
                if(data.children){
                    this.renderList(data.children, level + 1);
                }else if(level < this.data.length - 1){
                    this.renderList(this.data[level + 1], level + 1);
                }

                this.$emit('select', this.vals);
            },

            listen(level){
                let $scroll = this.$refs.scrolls[level];

                $scroll.$on('drag:end', (pos, dest = pos, duration = 0) => {
                    let dataList = this.dataList[level];
                    let index = Math.min(dataList.length - 1, Math.round(Math.abs(Math.min(dest , pos)) / HEIGHT));
                    this.select(dataList[index], index, level, duration);
                });

                level === this.data.length - 1 && setTimeout(() => this.$emit('scroll:ready'), 20);
            },

            confirm(){
                let labels = this.getLabels();

                this.val = this.vals.map((item) => {
                    return item.value;
                });

                this.$emit('confirm', this.val, labels, this.vals);
                this.close();
            },

            getLabels(){
                return this.vals.map((item) => {
                    return item.label;
                });
            }
        }
    }
</script>

<style lang="less">
    .vm-iosselect.vm-overlay{
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 10001;
        background: #f5f5f5;
    }

    .vm-iosselect-header{
        display: flex;
        height: .44rem;
        background: #fff;
        justify-content: space-between;

        a{
            display: inline-block;
            height: .44rem;
            text-decoration: none;
            line-height: .44rem;
            width: .5rem;
            color: #ddd;
            text-align: center;
            font-size: .14rem;
        }

        .vm-iosselect-confirm{
            color: #7792cb;
        }
    }

    .vm-iosselect-scroll-list{
        width: 100%;
        height: 1.75rem;
        display: flex;
    }

    .vm-iosselect-scroll{
        flex-grow: 1;
    }

    .vm-iosselect-scroll-inner{
        padding: 0.7rem 0px;

        a{
            color: #333;
            display: block;
            height: .35rem;
            line-height: .35rem;
            text-align: center;
            text-decoration: none;
            opacity: 0.3;
            font-size: 0.13rem;
        }

        .vm-iosselect-selected{
            opacity: 1;
        }
    }
</style>