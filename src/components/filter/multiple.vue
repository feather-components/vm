<template>
    <scroll ref="scroll" class="vmui-filter vmui-filter-multiple" :fill-height="fillHeight">
        <a href="javascript:" v-for="(item, key) of data" v-html="itemFormatter(item)" @click="click(item)" :class="getItemClass(item)"></a>
    </scroll>
</template>

<style>
.vmui-filter-multiple .vmui-filter-item{
    text-align: left;
}

.vmui-filter-tick{
    &:after{
        content: "";
        display: inline-block;
        float: right;
        height: .44rem;
        width: .20rem;
        background: url(./selected@2x.png?__inline) no-repeat center center;
    }
}
</style>

<script>
import Scroll from '../scroll';
import Single from './single';
import _ from '../helper';

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

        defaultValue: {
            type: Array,
            default: null
        }
    },

    data(){
        return {
            value: [],
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
                vals = self.value.slice(0);

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

            self.$emit('change', self.value = vals, self.getLabels(vals), item);
        },

        getItemClass(item){
            var className = Single.methods.getItemClass(item);

            if(this.value.indexOf(item.value) > -1){
                className += ' vmui-filter-tick';
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