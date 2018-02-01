<template>
    <div class="vm-filters" :class="'vm-filters-' + filters.length">
        <template v-for="(filter, index) of filters">
            <scroll class="vm-filters-item">
                <single :source="filter" @item:click="click" :item-formatter="itemFormatter" ref="box" @reject="$emit('reject')" @change="change"></single>
            </scroll>
        </template>
    </div>
</template>

<style>
    .vm-filters{
        display: -webkit-box;
        display: box;
    }

    .vm-filters .vm-filters-item{
        -webkit-box-flex: 1;
        box-flex: 1;
        border-left: 1px solid #eee;
    }

    .vm-filters .vm-filters-item:first-child{
        border-left: 0px;
    }

    .vm-filters-2 .vm-filters-item:nth-child(1){
        -webkit-box-flex: 2;
    }
</style>

<script>
    import Scroll from '../scroll';
    import Single from './single';
    import Ajax from 'ajax';

    export default{
        props: {
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

            unlimitLabel: {
                type: String,
                default: '不限'
            },

            unlimitValue: {
                type: [Number, String],
                default: undefined
            },

            unlimitStartLevel: {
                type: Number,
                default: 0
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
            },

            value: {
                type: Array,
                default(){
                    return [];
                }
            },
        },

        components: {
            Single,
            Scroll
        },

        data(){
            return {
                filters: [],
                val: this.value || [],
                paths: [],
                parent: null
            };
        },

        watch: {
            source(v){
                this.render(v);
            },

            val(v){
                this.$emit('input', v);
            },

            value(v){
                if(v === this.val) return;
                this.render(this.data);
                this.val = v;
            }
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
                    var items = source.filter((item) => {
                        for(var i = level; i >=0; i--){
                            if(item.value != self.value[i]){
                                return false;
                            }

                            item = item.__parent;
                        }
                        
                        return true;
                    });  

                    if(items.length){
                        var item = items[0];
                        self.$refs.box[level].setValue(item.value);
                        self.click(item);
                    }else{
                        self.$refs.box[level].setValue(null);
                    }
                });
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

                source = self.formatSource(source, level);

                if(level > 0){
                    self.parent.children = source; 
                }else{
                    self.data = source;
                }

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
                    o[self.names[level - 1] || self.names[0]] = self.parent.value;
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

            click(item){
                var self = this;

                self.$emit('item:click', item);
                
                if(self.isMaxLevel(item.__level)){
                    return;
                }else if(this.unlimitValue !== undefined && item.value === this.unlimitValue){
                    self.parent = item;
                    self.filters = self.filters.slice(0, item.__level + 1);
                }else{
                    if(item === self.parent) return false;
                    
                    self.parent = item;
                    self.render(item.children, item.__level + 1);
                }
            },

            formatSource(source, level){
                if(source.__formatted){
                    return source;
                }

                let arr = [];

                if(this.unlimitValue !== undefined && level >= this.unlimitStartLevel){
                    arr.push({
                        label: this.unlimitLabel,
                        value: this.unlimitValue
                    });
                }

                try{
                    source = arr.concat(this.dataFormatter(source, level, this.parent));
                }catch(e){
                    source = arr;
                }

                source = source.map((item) => {
                    if(this.parent){
                        item.__parent = this.parent;
                    }
                    
                    item.__level = level;
                    return item;
                });

                source.__formatted = true;
                return source;
            },

            change(val, label, item){
                var self = this;

                if(!item){
                    self.$emit('paths:change', []);
                    self.$emit('change', [], [], []);
                    return false;
                }

                var level = item.__level;

                self.paths = self.paths.slice(0, level).concat(item);
                self.$emit('paths:change', self.paths);

                if(self.isMaxLevel(level) || self.unlimitValue !== undefined && val === this.unlimitValue){
                    var paths = self.paths.slice(0), labels = [], objs = {};
                    var vals = paths.map((item, level) => {
                        objs[self.names[level] || ('level' + level)] = item.value;
                        labels.push(item.label);
                        return item.value;
                    });

                    vals.toString() !== self.val.toString() && self.$emit('change', self.val = vals, labels, objs, item);
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