<template>
<scroll ref="scroll" class="vmui-filter vmui-filter-multiple" :fill-height="fillHeight">
    <a href="javascript:" v-for="(item, key) of data" v-html="item.label" @click="clickItem(item)" :class="getItemClass(item)"></a>
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
        background: url(./selected@2x.png) no-repeat center center;
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

        canBeSelect: {
            type: Function,
            default(){
                return this.infinite || this.value.length < this.size;
            }
        }
    },

    data(){
        return {
            value: [],
            infinite: this.size < 0
        };
    },

    methods: {
        clickItem(item){
            var self = this, value = item.value;

            self.$emit('item:click', item);

            if(self.disabled){
                self.$emit('reject');
                return false;
            }

            var vals = self.value.slice(0);
            var index = vals.indexOf(value);
                
            if(index > -1){
                vals.splice(index, 1);
            }else if(!self.canBeSelect.call(self, item)){
                self.$emit('reject');
                return false;
            }else{
                vals.push(value);
            }

            self.$emit('change', self.value = vals, self.getSelectedLabels(), item);
        },

        getItemClass(item){
            var className = Single.methods.getItemClass(item);

            if(this.value.indexOf(item.value) > -1){
                className += ' vmui-filter-tick';
            }

            return className;
        },

        getSelectedLabels(){
            return this.source.filter((item) => {
                return this.value.indexOf(item.value) > -1;
            }).map((item) => {
                return item.label;
            });
        }
    }
}
</script>