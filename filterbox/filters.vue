<template>
<div class="vmui-filters">
    <template v-for="(filter, index) of filters">
        <box :source="filter" @item:click="clickItem" :level="index"></box>
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
    mixins: [Box],

    props: {
        names: {
            type: Array,
            default(){
                return [];
            }
        }
    },

    components: {
        Box: Box
    },

    data(){
        return {
            filters: [this.source],
            maxLevel: (this.size > 1 ? 2 : this.names.length) - 1
        };
    },

    mounted(){

    },

    methods: {
        render(){},

        clickItem(item){
            if(item.__level < this.maxLevel){
                this.filters = this.filters.slice(0, item.__level + 1).concat([item.children || this.source]);
                console.log(this.filters);
            }
        }

        /*renderList(source){
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

        getItemClass(item, index){
            var self = this;
            var className = ['vmui-filterbox-item'], isSeled = false;

            if(self.indexs[index] == item.value){
                className.push('vmui-filterbox-ii');
            }

            if(self.multiple){
                if(self._names.length == 2){
                    if(level == 0){
                        isSeled = data.value in self.vals;
                    }else{
                        isSeled = (self.vals[data.__p__] || []).indexOf(data.value) > -1;
                    }
                }else{
                    isSeled = self.vals.indexOf(data.value) > -1;
                }
            }

            isSeled && className.push('vmui-filterbox-selected');

            return className.join(' ');
        }*/
    }
}
</script>