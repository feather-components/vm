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

    .vmui-filter-item{
        text-align: left;
    }

    .vmui-filters-ln{
        float: right;
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

        size: {
            type: Number,
            default: 1
        },

        perMaxSize: {
            type: Number,
            default: 1
        }
    }),

    components: {
        Box
    },

    data(){
        return {
            filters: [],
            infinite: this.size < 0,
            singleVals: [],
            multipleVals: {},
            parent: null
        };
    },

    computed: {
        maxLevel(){
            return Math.max(1, this.size > 1 || this.infinite ? 1 : this.names.length - 1);
        },

        isMultiple(){
            return this.infinite || this.size > 1;
        },

        perInfinite(){
            return this.isMultiple && this.perMaxSize < 0;
        },

        perSize(){
            if(this.isMultiple){
                return this.perInfinite ? 10000000 : this.perMaxSize;
            }

            return 1;
        },

        totalSize(){
            if(this.isMultiple){
                return this.infinite ? 10000000 : this.size;
            }

            return 1;
        }
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
                    var $instance = self.$refs.box[nextLevel];

                    if(self.isMultiple){
                        nextLevel == 1 && $instance.val(self.multipleVals[item.value] || []);
                    }else{
                        $instance.val(self.singleVals[nextLevel]);
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
                defaultValue: []
            };

            props.itemFormatter = (item) => {
                if(level == 0 && self.isMultiple){
                    if(self.perInfinite || self.perSize == 1){
                        if(item.value in self.multipleVals){
                            return '<span class="vmui-filters-selected">' + item.label + '</span>';
                        }else{
                            return item.label;
                        }
                    }else{
                        var vals = self.multipleVals[item.value];
                        var len = vals ? vals.length : 0;

                        return '<span class="vmui-filters-limit">' + item.label + '<span class="vmui-filters-ln">(' + len + '/' + self.perSize + ')</span></span>';
                    }
                }else{
                    return item.label;
                }                    
            };

            props.change = (val) => {
                var parent = self.parent;

                do{
                    if(level == 1){
                        if(self.isMultiple){
                            if(val.length){
                                self.multipleVals[parent.value] = val;
                            }else{
                                delete self.multipleVals[parent.value];
                            }

                            self.create();
                            self.$emit('change', self.multipleVals);
                            break;
                        }
                    }

                    self.singleVals = self.singleVals.slice(0, parent.__level + 1).concat(val);
                    self.$emit('change', self.singleVals);
                }while(0);
                
                self.isPerSizeExceeded() && self.$emit('persize:exceed');
                self.isSizeExceeded() && self.$emit('size:exceed');
            };

            if(self.filters[level]){
                self.filters.splice(level, 1, props);
            }else{
                self.filters.push(props);
            }
        },

        isMaxLevel(item){   
            return item.__level == this.maxLevel;
        },

        isSizeExceeded(){
            if(this.isMultiple){
                var count = 0;

                for(var l0 in this.multipleVals){
                    count += this.multipleVals[l0].length;
                }

                return count > this.totalSize;
            }

            return false;
        },

        isPerSizeExceeded(){
            if(this.isMultiple){
                for(var l0 in this.multipleVals){
                    if(this.multipleVals[l0].length > this.perSize){
                        return true;
                    }
                }
            }

            return false;
        }
    }
}
</script>