<template>
<scroll ref="scroll" class="vmui-filter" :fill-height="fillHeight">
    <a href="javascript:" v-for="(item, key) of data" v-html="itemFormatter(item)" @click="click(item)" :class="getItemClass(item)"></a>
</scroll>
</template>

<style>
.vmui-filter-item{
    height: .44rem;
    text-decoration: none;
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-size: .14rem;
    color: #555;
    line-height: .44rem;
    text-align: center;
    border-bottom: 1px solid #eee;
    padding: 0px 15px;
}

.vmui-filter-selected{
    color: #6281C2;
}
</style>

<script>
import Scroll from '../scroll';
import _ from '../helper';

export default{
    props: {
        fillHeight: {
            type: Boolean,
            default: false
        },

        source: {
            type: Array,
            default(){
                return [];
            }
        },

        disabled: {
            type: Boolean,
            default: false
        },

        selectedClassName: {
            type: String,
            default: 'vmui-filter-selected'
        },

        defaultValue: {
            type: [String, Number],
            default: null
        },

        itemFormatter: {
            type: Function,
            default(item){
                return item.label;
            }
        }
    },

    components: {
        Scroll: Scroll,
    },

    data(){
        return {
            data: [],
            value: []
        };
    },

    watch: {
        source(v){
            this.render(v);
        },

        defaultValue(v){
            this.setValue(v);
        }
    },

    mounted(){
        this.render();
        this.defaultValue && this.setValue(this.defaultValue);
    },

    methods: {
        render(source = this.source){
            var self = this;

            self.data = source || [];
            self.$nextTick(() => self.$refs.scroll.refresh());
        },

        click(item){
            var self = this;

            self.$emit('item:click', item);
            self.setValue(item.value);
        },

        setValue(value){
            var self = this;

            if(self.disabled){
                self.$emit('reject');
                return false;
            }

            var item = self.getItemByValue(value);
            self.$emit('change', self.value = value, item.label, item);
        },

        getItemClass(item){
            var self = this;
            var className = ['vmui-filter-item'];

            if(item.value == self.value){
                className.push('vmui-filter-selected');
                self.selectedClassName && className.push(self.selectedClassName);
            }

            return className.join(' ');
        },

        getItemByValue(value, data = this.data){
            return data.filter((item) => {
                return item.value == value;
            })[0];
        }
    }
}
</script>