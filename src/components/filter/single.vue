<template>
    <div class="vmui-filter">
        <a href="javascript:" v-for="(item, key) of data" v-html="itemFormatter(item)" @click="click(item)" :class="getItemClass(item)"></a>
    </div>
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

    .vmui-filter-item:last-child{
        border-bottom: 0px;
    }
    
    .vmui-filter-selected{
        color: #6281C2;
    }
</style>

<script>
    import Scroll from '../scroll';

    export default{
        name: 'single-filter',

        props: {
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

            value: {
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
                val: null
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
                this.setValue(v);
            }
        },

        mounted(){
            this.render();
            this.value && this.setValue(this.value);
        },

        methods: {
            render(source = this.source){
                this.data = source || [];
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
                var label;

                if(item){
                    label = item.label;
                }

                self.$emit('change', self.val = value, label, item);
                self.$emit('input', self.val);
            },

            getItemClass(item){
                var self = this;
                var className = ['vmui-filter-item'];

                if(item.value == self.val){
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