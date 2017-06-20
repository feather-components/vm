<template>
    <div class="vmui-filters vmui-filters-lm" v-if="filters.length" v-autosize>
        <scroll class="vmui-filters-item vmui-filters-lml">
            <single :source="filters[0]" @item:click="click" :item-formatter="getItemFormatter()" ref="left" />
        </scroll>
        
        <scroll class="vmui-filters-item">
            <multiple :source="filters[1]" ref="right" selected-class-name="vmui-filter-tick" :size="perSize" @change="change" :can-select="canSelect" @reject="$emit('reject')" />
        </scroll>
    </div>
</template>

<style>
    .vmui-filters-lm .vmui-filter .vmui-filter-item{
        text-align: left;
    }

    .vmui-filters-lml{
        -webkit-box-flex: 2 !important;
    }
</style>

<script>
    import Single from './single';
    import Multiple from './multiple';
    import Link from './link';
    import {Util} from '../../helper';
    import Autosize from '../../directives/autosize';
    import Scroll from '../scroll';

    export default{
        mixins: [Link],

        components: {
            Single,
            Multiple,
            Scroll,
        },

        directives: {
            Autosize
        },

        props: {
            size: {
                type: Number,
                default: -1
            },

            perSize: {
                type: Number,
                default: -1
            },

            onlyOneParent: {
                type: Boolean,
                default: false
            },

            value: {
                type: Object,
                default(){
                    return {};
                }
            },
        },

        data(){
            return {
                infinite: this.size < 0,
                parent: null,
                count: 0,
                val: this.value || {},
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

                self.$on('filter:render', (source, level) => {
                    if(level == 1){
                        self.$refs.right.setValue(self.val[self.parent.value] || []);
                    }else{
                        var lv = Util.firstKey(self.val);

                        if(lv !== false){
                            self.$refs.left.setValue(lv);
                            var parent = Single.methods.getItemByValue(lv, source);
                            self.render(parent.children, 1);
                        }else{
                            self.click(source[0]);
                        }
                    }
                });
            },

            getItemFormatter(){
                var self = this;

                if(self.perInfinite || self.perMaxSize == 1){
                    return (item) => {
                        if(item.value in self.val){
                            return `<span class="vmui-filter-tick">${item.label}</span>`;
                        }else{
                            return item.label;
                        }
                    }
                }else{
                    return (item) => {
                        var len = (self.val[item.value] || []).length;
                        return `${item.label}<span class="vmui-filters-ln">(${len}/${self.perMaxSize})</span>`;
                    }
                }
            },

            change(val, labels, item){
                var self = this, parent = self.parent.value, parentLabel = self.parent.label;

                if(!val.length && !self.val[parent]){
                    return false;
                }

                var vals = Util.assign({}, self.val);

                if(val.length){
                    vals[parent] = val;
                    self.labels[parentLabel] = labels;
                }else{
                    delete vals[parent];
                    delete self.labels[parentLabel];
                }

                self.val = vals;
                self.$emit('change', self.val, self.labels, item);
            },

            canSelect(item){
                var self = this, count = 0;

                for(var i in self.val){
                    count += self.val[i].length;
                }

                return count < self.maxSize && (!self.onlyOneParent || item.__parent == self.parent.value);
            }
        }
    }
</script>