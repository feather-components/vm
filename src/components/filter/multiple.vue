<template>
    <div class="vm-filter vm-filter-multiple">
        <a href="javascript:" v-for="(item, key) of data" v-html="itemFormatter(item)" @click="click(item)" :class="getItemClass(item)"></a>
    </div>
</template>

<style lang="less">
    .vm-filter-multiple .vm-filter-item{
        text-align: left;
    }

    .vm-filter-tick{
        &:after{
            font-family: "vm-iconfont" !important;
            font-style: normal;
            content: "\e68c";
            display: inline-block;
            float: right;
            font-size: 0.18rem;
            height: .44rem;
            width: .20rem;
        }
    }
</style>

<script>
    import Single from './single';
    import {Util} from '../../helper';
    import '../icon/iconfont.css';

    export default{
        mixins: [Single],

        props: {
            size: {
                type: Number,
                default: -1
            },

            canSelect: {
                type: Function,
                default(){
                    return this.infinite || this.value.length < this.size;
                }
            },

            value: {
                type: Array,
                default: null
            }
        },

        data(){
            return {
                val: [],
                infinite: this.size < 0
            };
        },

        methods: {
            click(item){
                var self = this, value = item.value;
                self.$emit('item:click', item);
                self.setValue(item.value, true);
            },

            setValue(value, update = false){
                var self = this;

                if(self.disabled){
                    self.$emit('reject');
                    return false;
                }

                var vals, item = self.getItemByValue(value);

                if(!update){
                    vals = value;
                }else{
                    vals = self.val.slice(0);

                    var index = vals.indexOf(value);

                    if(index > -1){
                        vals.splice(index, 1);
                    }else if(!self.canSelect.call(self, item)){
                        self.$emit('reject');
                        return false;
                    }else{
                        vals.push(value);
                    }
                }

                if(vals.toString() == self.val.toString()){
                    return;
                }

                self.$emit('change', self.val = vals, self.getLabels(vals), item);
            },

            getItemClass(item){
                var className = Single.methods.getItemClass(item);

                if(this.val.indexOf(item.value) > -1){
                    className += ' vm-filter-tick ' + this.selectedClassName;
                }

                return className;
            },

            getLabels(vals, data = this.data){
                return data.filter((item) => {
                    return vals.indexOf(item.value) > -1;
                }).map((item) => {
                    return item.label;
                });
            }
        }
    }
</script>