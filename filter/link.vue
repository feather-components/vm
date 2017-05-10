<template>
<div class="vmui-filters" :class="'vmui-filters-' + filters.length">
    <template v-for="(filter, index) of filters">
        <single :source="filter" @item:click="clickItem" :item-formatter="itemFormatter" ref="box" @reject="$emit('reject')" @change="change" :fill-height="fillHeight"></single>
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

.vmui-filters-2 .vmui-filter:nth-child(1){
    -webkit-box-flex: 2;
}
</style>

<script>
import Single from './single';
import Ajax from 'ajax';
import _ from '../helper';

export default{
    props: {
        fillHeight: {
            type: Boolean,
            default: false
        },

        source: {
            type: [Array, String, Object],
            default(){
                return []
            }
        },

        itemFormatter: {
            type: Function,
            default(item){
                return item.label;
            }
        },

        params: {
            type: Object,
            default(){
                return {};
            }
        },

        names: {
            type: Array,
            default(){
                return ['id'];
            }
        },

        level: {
            type: Number,
            default: 2
        },

        dataFormatter: {
            type: Function,
            default(data){
                return data;
            }
        }
    },

    components: {
        Single
    },

    data(){
        return {
            filters: [],
            value: [],
            paths: [],
            parent: null
        };
    },

    computed: {
        maxLevel(){
            return this.level - 1;
        }
    },

    mounted(){
        this.initEvent();
        this.render(); 
    },

    methods: {
        initEvent(){
            var self = this;

            self.$on('filter:render', (source, level) => {
                if(level > 0){
                    self.$refs.box[level].value = self.value[level];
                }
            })
        },

        render(source, level = 0){
            var self = this;

            self.filters = self.filters.slice(0, level);
            source = self.getSource(source, level);

            if(typeof source == 'string'){
                self.renderFromRemote(source, level);
            }else{
                self.renderList(source, level);
            }
        },

        renderList(source, level){
            var self = this;

            if(level > 0){
                self.parent.children = source; 
            }else{
                self.data = source;
            }

            source = self.formatSource(source, level);

            var refresh = false;

            if(self.filters[level]){
                refresh = true;
                self.filters.splice(level, 1, source);
            }else{
                self.filters.push(source);
            }

            self.$nextTick(() => {
                refresh && self.$emit('filter:refresh', source, level);
                self.$emit('filter:render', source, level);
            });
        },

        renderFromRemote(source, level){
            var self = this, o = {};

            if(level > 0){
                o[self.names[level] || self.names[0]] = self.parent.value;
            }

            self.$http && self.$http.abort();
            self.$http = Ajax({
                dataType: 'json',
                url: source,
                data: Object.assign(o, self.params),
                success: (data) => {
                    self.$emit('xhr:success', data);
                    self.renderList(data, level);
                },
                complete: () => self.$emit('xhr:completed')
            });
        },

        clickItem(item){
            var self = this;

            self.$emit('item:click', item);

            if(self.isMaxLevel(item.__level)){
                return;
            }else{
                self.parent = item;
                self.render(item.children, item.__level + 1);
            }
        },

        formatSource(source, level){
            try{
                source = this.dataFormatter(source); 
            }catch(e){
                source = [];
            }

            return source.map((item) => {
                item.__level = level;
                return item;
            });
        },

        change(val, item){  
            var self = this, level = item.__level;

            self.paths = self.paths.slice(0, level).concat(item);
            self.$emit('paths:change', self.paths);

            if(self.isMaxLevel(level)){
                var paths = self.paths.slice(0), labels = [];
                
                self.value = paths.map((item) => {
                    labels.push(item.label);
                    return item.value;
                });

                self.$emit('change', self.value, labels, item);
            }
        },

        isMaxLevel(level){   
            return level == this.maxLevel;
        },

        getSource(source, level){
            if(!source){
                source = this.source;

                if(Array.isArray(source) && typeof source[0] == 'string'){
                    source = source[level] || source[0];
                }
            }

            return source;
        }
    }
}
</script>