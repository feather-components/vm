<template>
    <div class="vmui-filters vmui-filters-lm" v-if="filters.length" v-autosize="{fill: true}">
        <single :source="filters[0]" @item:click="click" :item-formatter="getItemFormatter()" ref="left" class="vmui-filter-lml"></single>
        <multiple :source="filters[1]" ref="right" selected-class-name="vmui-filter-tick" :size="perSize" @change="change" :can-select="canSelect" @reject="$emit('reject')"></multiple>
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
    import {Util} from '../../helper';
    import Autosize from '../../directives/autosize';

    export default{
        mixins: [Link],

        components: {
            Single,
            Multiple
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

            defaultValue: {
                type: Object,
                default(){
                    return {}
                }
            }
        },

        data(){
            return {
                infinite: this.size < 0,
                value: this.defaultValue,
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

                self.$on('filter:render', (source, level) => {
                    if(level == 1){
                        self.$refs.right.setValue(self.value[self.parent.value] || []);
                    }else{
                        var lv = Util.firstKey(self.value);

                        if(lv !== false){
                            self.$refs.left.setValue(lv);
                            self.click(Single.methods.getItemByValue(lv, source));
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
                var self = this, parent = self.parent.value, parentLabel = self.parent.label;

                if(!val.length && !self.value[parent]){
                    return false;
                }

                if(val.length){
                    self.value[parent] = val;
                    self.labels[parentLabel] = labels;
                }else{
                    delete self.value[parent];
                    delete self.labels[parentLabel];
                }

                self.$refs.left.value = null;
                self.$refs.left.setValue(parent);
                self.$emit('change', self.value, self.labels, item);
            },

            canSelect(item){
                var self = this, count = 0;

                for(var i in self.value){
                    count += self.value[i].length;
                }

                return count < self.maxSize && (!self.onlyOneParent || item.__parent == self.parent.value);
            }
        }
    }
</script>