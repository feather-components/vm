<template>
<div class="vmui-filterbox" @click.stop="">
    <div v-for="(data, index) of filters" class="vmui-filterbox-column">
        <scroll :fill-height="false" ref="scroll" :style="filterStyle">
            <a href="javascript:" v-for="(item, key) of data" v-html="itemFormatter(item)" @click="select(item, key, index)" :class="'vmui-filterbox-item' + (indexs[index] == data.value ? ' vmui-filterbox-selected' : '')"></a>
        </scroll>   
    </div>
</div>
</template>

<style>
.vmui-filterbox{
    display: -webkit-box;
    display: box;
}

.vmui-filterbox-column{
    -webkit-box-flex: 1;
    box-flex: 1;
    border-left: 1px solid #eee;

    &:nth-child(1){
        border-left: 0px;
    }

    .vmui-filterbox-item{
        height: .44rem;
        text-decoration: none;
        display: inline-block;
        width: 100%;
        font-size: .14rem;
        color: #555;
        line-height: .44rem;
        text-align: center;
        border-top: 1px solid #eee;
    }

    .vmui-filterbox-selected{
        color: #6281C2;
    }
}
</style>

<script>
import Scroll from '../scroll';
import Ajax from 'ajax';
import _ from '../helper';

/*

source: "",
names: [],
dataFormatter:


[
    {
        label: "xxx",
        value: "xx",
        children: [

        ]
    } 
],

{
    source: [],
    names: ['p', 'x', 'a', 'b'],
    dataFormatter: {

    }
}
*/

export default{
    props: {
        filterStyle: {
            type: Object,
            default(){
                return {}
            }
        },

        source: {
            type: [Array, String],
            default(){
                return [];
            }
        },

        itemFormatter: {
            type: Function,
            default(item){
                return item.label;
            }
        },

        dataFormatter: {
            type: Function,
            default(data){
                return data || [];
            }
        },

        names: {
            type: Array,
            default(){
                return [];
            }
        },

        autoRender: {
            type: Boolean,
            default: true
        },

        multiple: {
            type: Boolean,
            default: false
        },

        multipleSize: {
            type: Number,
            default: 0
        }
    },

    components: {
        Scroll: Scroll
    },

    data(){
        return {
            level: 0,
            filters: [],
            indexs: [],
            vals: []
        };
    },

    mounted(){
        this._names = this.multiple ? this.names.slice(0, 2) : this.names;

        if(this._names.length > 1 && this.multiple){
            this.vals = {};
        }

        this.initEvent();
        this.autoRender && this.render();
    },

    methods: {
        initEvent(){
            _.on(this.$el, 'click', (e) => {
                e.stopPropagation();
            });
        },

        render(){
            if(this._isRendered){
                return;
            }

            this._isRendered = true;

            if(this.isRemoteSource()){
                this.renderFromRemote();
            }else{
                this.renderList(this.source);
            };
        },

        renderList(source){
            var self = this;

            try{
                source = self.dataFormatter(source); 
            }catch(e){
                source = [];
            }

            if(!source.length) return;

            if(self.level > 0){
                source = source.map((item) => {
                    item.__p__ = self.indexs[self.level];
                    return item;
                });
            }
            
            self.filters = self.filters.slice(0, self.level).concat([source]);
            console.log(self.indexs, self.filters);
            self.$nextTick(() => {
                self.$refs.scroll[self.level].refresh();
            });
        },

        renderFromRemote(){
            var self = this;
            var params = {}, level = self.level;

            if(level > 0){
                params[self._names[level]] = self.vals[level];
            }

            self.abort();
            self.$http = Ajax({
                url: self.source,
                data: params,
                success: (data) => self.renderList(data)
            });
        },

        abort(){
            this.$http && this.$http.abort();
        },

        clear(level){
            var self = this;

            self.filters = self.filters.slice(0, level + 1);
            self.indexs = self.indexs.slice(0, level);

            if(!self.multiple){
                self.vals = self.vals.slice(0, level);
            }
            
            self.level = level;
        },

        select(data, level){
            var self = this;

            if(self.vals[level] == data.value) return;

            self.clear(level);

            if(!self.multiple){
                self.vals[level] = data.value;
            }else if(level == self._names.length - 1){
                var index = self.vals[level].indexOf(data.value);

                if(index > -1){
                    self.vals[level].splice(index, 1);
                }
            }
            
            self.$emit('select', self.vals);

            self.level++;

            if(!self.isRemoteSource()){
                if(data.children && data.children.length){
                    self.renderList(data.children);
                }
            }else if(self._names.length > self.level){
                self.renderFromRemote();
            }
        },

        isRemoteSource(){
            return typeof this.source == 'string';
        }
    }
}
</script>