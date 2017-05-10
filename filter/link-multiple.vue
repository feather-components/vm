<template>
<div class="vmui-filters vmui-filters-lm" v-if="filters.length">
    <single :source="filters[0]" @item:click="clickItem" :item-formatter="getItemFormatter()" ref="left" class="vmui-filter-lml" :fill-height="fillHeight"></single>
    <multiple :source="filters[1]" ref="right" selected-class-name="vmui-filter-tick" :size="perSize" @change="change" :can-be-select="canBeSelect" @reject="$emit('reject')" :fill-height="fillHeight"></multiple>
</div>
</template>

<style>
.vmui-filters-lm .vmui-filter-item{
    text-align: left;
}

.vmui-filters-lm .vmui-filters-ln{
    float: right;
}

.vmui-filter-lml{
    -webkit-box-flex: 2 !important;
}
</style>

<script>
import Single from './single';
import Multiple from './multiple';
import Link from './link';

import _ from '../helper';

export default{
    mixins: [Link],

    components: {
        Single,
        Multiple
    },

    props: {
        size: {
            type: Number,
            default: -1
        },

        perSize: {
            type: Number,
            default: -1
        }
    },

    data(){
        return {
            infinite: this.size < 0,
            value: {},
            parent: null,
            count: 0,
            labels: {}
        };
    },

    computed: {
        perInfinite(){
            return this.perSize < 0;
        },

        perMaxSize(){
            return this.perInfinite ? 10000000 : this.perSize;
        },

        maxSize(){
            return this.infinite ? 10000000 : this.size;
        }
    },

    methods: {
        initEvent(){
            var self = this;

            self.$once('filter:render', (source, level) => {
                if(level == 0){
                    var item = source[0];
                    self.clickItem(item);
                    self.$refs.left.value = item.value;
                }
            });

            self.$on('filter:render', (source, level) => {
                if(level == 1){
                    self.$refs.right.value = self.value[self.parent.value] || [];
                }
            });
        },

        getItemFormatter(){
            var self = this;

            if(self.perInfinite || self.perMaxSize == 1){
                return (item) => {
                    if(item.value in self.value){
                        return `<span class="vmui-filter-tick">${item.label}</span>`;
                    }else{
                        return item.label;
                    }
                }
            }else{
                return (item) => {
                    var len = (self.value[item.value] || []).length;
                    return `${item.label}<span class="vmui-filters-ln">(${len}/${self.perMaxSize})</span>`;
                }
            }
        },

        change(val, labels, item){
            var self = this, level = item.__level;

            if(val.length){
                self.count++;
                self.value[self.parent.value] = val;
                self.labels[self.parent.label] = labels;
            }else{
                self.count--;
                delete self.value[self.parent.value];
                delete self.labesl[self.parent.label];
            }

            self.renderList(self.data, 0);
            self.$emit('change', self.value, self.labels, item);
        },

        canBeSelect(){
            return this.count < this.maxSize;
        }
    }
}
</script>