<template>
<div :class="'vmui-filterbox' + (multiple ? ' vmui-filterbox-multiple' : '')" @click.stop="">
    <div v-for="(data, index) of filters" class="vmui-filterbox-column">
        <scroll :fill-height="false" ref="scroll" :style="filterStyle">
            <a href="javascript:" v-for="(item, key) of data" v-html="itemFormatter(item)" @click="select(item, index)" :class="'vmui-filterbox-item' + (indexs[index] == item.value ? ' vmui-filterbox-ii' : '') + (isSelected(item, index) ? ' vmui-filterbox-selected' : '')"></a>
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
        box-sizing: border-box;
        font-size: .14rem;
        color: #555;
        line-height: .44rem;
        text-align: center;
        border-top: 1px solid #eee;
        padding: 0px 15px;
    }

    .vmui-filterbox-ii{
        color: #6281C2;
    }

    .vmui-filterbox-selected{
        color: #6281C2;

        &:after{
            content: "";
            display: inline-block;
            float: right;
            height: .44rem;
            width: .20rem;
            background: url(./selected@2x.png) no-repeat center center;
        }
    }
}

.vmui-filterbox-multiple{
    .vmui-filterbox-item{
        text-align: left;
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
            level: -1,
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

            self.level++;

            if(self.level > 0){
                source = source.map((item) => {
                    item.__p__ = self.indexs[self.level - 1];
                    return item;
                });
            }
            
            self.filters = self.filters.slice(0, self.level).concat([source]);
            self.$nextTick(() => {
                self.$refs.scroll[self.level].refresh();
            });
        },

        renderFromRemote(){
            var self = this;
            var params = {}, level = self.level;

            if(level > 0){
                params[self._names[level]] = self.indexs[level];
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

        clear(level, clearFilters){
            var self = this;

            if(clearFilters){
                self.filters = self.filters.slice(0, level + 1);
            }
            
            self.indexs = self.indexs.slice(0, level);

            if(!self.multiple){
                self.vals = self.vals.slice(0, level);
            }
            
            self.level = level;
        },

        select(data, level){
            var self = this;

            if(self.vals[level] == data.value) return;

            self.clear(level, false);
            self.indexs.push(data.value);

            if(!self.multiple){
                self.vals[level] = data.value;
            }else{
                var index;
  
                if(typeof data.__p__ !== 'undefined'){
                    var vals = self.vals[data.__p__] || [];

                    index = vals.indexOf(data.value);

                    if(index > -1){
                        vals.splice(index, 1);
                    }else if(!self.multipleSize || vals.length < self.multipleSize){
                        vals.push(data.value);
                    }

                    if(vals.length){
                        self.vals[data.__p__] = vals;
                    }else{
                        delete self.vals[data.__p__];
                    }
                }else if(self._names.length == 1){
                    index = self.vals.indexOf(data.value);

                    if(index > -1){
                        self.vals.splice(index, 1);
                    }else if(vals.length < multipleSize){
                        self.vals.push(data.value);
                    }
                }
            }

            self.$emit('select', self.vals);
            console.log(self.vals);

            if(!self.isRemoteSource()){
                if(data.children && data.children.length){
                    self.renderList(data.children);
                }
            }else if(self._names.length - 1 > self.level){
                self.renderFromRemote();
            }
        },

        isRemoteSource(){
            return typeof this.source == 'string';
        },

        isSelected(data, level){
            var self = this;

            if(self.multiple){
                if(self._names.length == 2){
                    if(level == 0){
                        return data.value in self.vals;
                    }else{
                        return (self.vals[data.__p__] || []).indexOf(data.value) > -1;
                    }
                }else{
                    return self.vals.indexOf(data.value) > -1;
                }
            }

            return false;
        }
    }
}
</script>