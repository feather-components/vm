<template>
<div class="vmui-filterbox">
    <ul class="vmui-filterbox-groups" @click.stop="">
        <li v-for="(source, index) of sources" class="vmui-filterbox-group" :style="filterStyle">
            <list source="" :data-formatter="source.dataFormatter" :row-formatter="rowFormatter" :showMsg="false" @clickRow="select" :fill-height="false" :pullup2load="true" ref="list" :auto-refresh="false"></list>
        </li>
    </ul>
</div>
</template>

<style>
.vmui-filterbox-groups{
    display: -webkit-box;
    display: box;
}

.vmui-filterbox-group{
    -webkit-box-flex: 1;
    box-flex: 1;
    border-left: 1px solid #eee;

    &:nth-child(1){
        border-left: 0px;
    }

    .vmui-list-item{
        height: .44rem;
        font-size: .14rem;
        color: #555;
        line-height: .44rem;
        text-align: center;
        border-top: 1px solid #eee;
 
        &:first{
            border-top: 0px;
        }
    }
}
</style>

<script>
import List from '../list';
import _ from '../helper';

/*
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

var overrideDataFormatter = (level, formatter) => {
    return (data) => {
        return (formatter ? formatter(data) : data).map((item) => {
            item._level_ = level;
            return item;
        });
    }
};

export default{
    props: {
        filterStyle: {
            type: Object,
            default(){
                return {}
            }
        },

        children: {
            type: [Array, Object],
            default(){
                return [];
            }
        },

        rowFormatter: {
            type: Function,
            default(rowData){
                return rowData.label;
            }
        },

        autoRender: {
            type: Boolean,
            default: true
        }
    },

    components: {
        List: List
    },

    data(){
        return {
            level: -1,
            sources: [],
            indexs: [],
            vals: []
        };
    },

    mounted(){
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
            this.renderList(this.children);
        },

        renderList(source){
            this.level++;

            var formatter = overrideDataFormatter(this.level, source.dataFormatter);

            if(!Array.isArray(source)){
                source = Object.assign({}, source, {
                    dataFormatter: formatter
                });
            }else{
                source = {
                    source: source,
                    dataFormatter: formatter
                };
            }

            this.sources.push(source);
            this.$nextTick(() => {
                var $list = this.$refs.list[this.level];
                $list.setSource(source.source);
                $list.refresh(false, !Array.isArray(source.source));
            });
        },

        clearList(level){
            this.sources = this.sources.slice(0, level + 1);
            this.indexs = this.indexs.slice(0, level + 1);
            this.level = level;
        },

        select(data, index){
            var level = data._level_;
            var self = this;

            self.clearList(level);
            self.indexs.push(index);

            if(data.children && data.children.length){
                self.renderList(data.children);
            }else{
                if(!Array.isArray(self.children) && this.children.names.length > level + 1){
                    self.renderList(self.children, level);
                }
            }

            this.vals = this.vals.slice(0, level).concat(data.value);
            this.$emit('select', this.vals);
        }
    }
}
</script>