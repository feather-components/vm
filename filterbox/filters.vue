<template>
<div class="vmui-filters">
    <template v-for="(filter, index) of filters">
        <box :source="filter.source" @item:click="clickItem" :level="index" :data-index="index" :change="filter.change" :size="filter.size" :item-formatter="filter.itemFormatter" ref="box" :data-formatter="filter.dataFormatter"></box>
    </template>
</div>
</template>

<style>
.vmui-filters{
    display: -webkit-box;
    display: box;
}

.vmui-filters .vmui-filter{
    -webkit-box-flex: 1;
    box-flex: 1;
    border-left: 1px solid #eee;

    &:nth-child(1){
        border-left: 0px;
    }
}

.vmui-filters-selected{
    &:after{
        content: "";
        display: inline-block;
        float: right;
        height: .44rem;
        width: .20rem;
        background: url(./selected@2x.png) no-repeat center center;
    }
}
</style>

<script>
import Box from './index';
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
    props: Object.assign({}, Box.props, {
        names: {
            type: Array,
            default(){
                return [];
            }
        },

        perSize: {
            type: Number,
            default: 1
        },

        totalSize: {
            type: Number,
            default: -1
        }
    }),

    components: {
        Box
    },

    data(){
        return {
            filters: [],
            maxLevel: Math.max(this.size > 1 ? 1 : this.names.length - 1, 0),
            singleVals: [],
            multipleVals: {},
            parent: null
        };
    },

    mounted(){
        this.create();
    },

    methods: {
        clickItem(item){
            var self = this, nextLevel = item.__level + 1;

            self.filters = self.filters.slice(0, nextLevel);
            self.$emit('item:click', item);

            if(self.isMaxLevel(item)){
                return;
            }else{
                self.parent = item;
                self.create(item.children, nextLevel);

                self.$nextTick(() => {
                    if(self.perSize > 1){
                        if(nextLevel == 1){
                            self.$refs.box[nextLevel].val(self.multipleVals[item.value] || []);
                        }   
                    }else{
                        self.$refs.box[nextLevel].val(self.singleVals[nextLevel]);
                    }
                });
            }
        },

        create(source = this.source, level = 0){
            var self = this;
            var props = {
                level: level,
                source: source,
                dataFormatter: self.dataFormatter,
                size: level == 0 ? 1 : self.perSize,
                itemFormatter: self.itemFormatter,
                defaultValue: [],
                change: this.listenChange(level)
            };

            if(self.perSize > 1 && level == 0){
                props.itemFormatter = (item) => {
                    return item.value in self.multipleVals ? '<span class="vmui-filters-selected">' + item.label + '</span>' : item.label;
                };
            }

            if(self.filters[level]){
                self.filters.splice(level, 1, props);
            }else{
                self.filters.push(props);
            }
        },

        listenChange(index){
            var self = this

            if(self.perSize > 1 && index == 1){
                return (val) => {
                    var parent = self.parent;

                    if(val.length){
                        self.multipleVals[parent.value] = val;
                    }else{
                        delete self.multipleVals[parent.value];
                    }

                    self.create();
                    self.$emit('change', self.multipleVals);
                }
            }else if(self.perSize == 1){
                return (val) => {
                    var parent = self.parent;
                    self.singleVals = self.singleVals.slice(0, parent.__level + 1).concat(val);
                    self.$emit('change', self.singleVals);
                }
            }else{
                return () => {};
            }
        },

        isMaxLevel(item){   
            return item.__level == this.maxLevel || !item.children && !this.isRemoteSource();
        }
    }
}
</script>