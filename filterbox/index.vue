<template>
<scroll ref="scroll" :class="'vmui-filter' + (size > 1 ? ' vmui-filter-multiple' : '')">
    <a href="javascript:" v-for="(item, key) of data" v-html="itemFormatter(item)" @click="clickItem(item)" :class="getItemClass(item)"></a>
</scroll>
</template>

<style>
.vmui-filter-item{
    height: .44rem;
    text-decoration: none;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    font-size: .14rem;
    color: #555;
    line-height: .44rem;
    text-align: center;
    border-top: 1px solid #eee;
    padding: 0px 15px;
}

.vmui-filter-selected{
    color: #6281C2;
}

.vmui-filter-multiple{
    .vmui-filter-item{
        text-align: left;
    }

    .vmui-filter-selected{
        &:after{
            content: "";
            display: inline-block;
            float: right;
            height: .44rem;
            width: .20rem;
            background: url(./selected@2x.png) no-repeat center center;
        }
    }
}
</style>

<script>
import Scroll from '../scroll';
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
    props: {
        source: {
            type: [Array, String],
            default(){
                return null;
            }
        },

        itemFormatter: {
            type: Function,
            default(item){
                console.log(333);
                return item.label;
            }
        },

        dataFormatter: {
            type: Function,
            default(data){
                return data || [];
            }
        },

        size: {
            type: Number,
            default: 1
        },

        selectedClassName: {
            type: String,
            default: 'vmui-filter-selected'
        },

        level: {
            type: Number,
            default: 0
        },

        defaultValue: null
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
        defaultValue(v){
            console.log(v);
            this.value = typeof v == 'undefined' ? [] : Array.isArray(v) ? v : [v];
        },

        source(v){
            this.render();
        }
    },

    mounted(){
        this.render();
    },

    methods: {
        val(){
            if(this.size > 1){
                return this.value;
            }else{
                return this.value[0];
            }
        },

        render(){
            if(this.isRemoteSource()){
                this.renderFromRemote();
            }else{
                this.renderList();
            }
        },

        renderList(source = this.source){
            var self = this;

            try{
                source = self.dataFormatter(source); 
            }catch(e){
                source = [];
            }

            self.data = source.map((item) => {
                item.__level = self.level;
                return item;
            });

            self.$nextTick(() => self.$refs.scroll.refresh());
        },

        renderFromRemote(source, params){
            var self = this;

            self.abort();
            self.$http = Ajax({
                url: source,
                data: params,
                success: (data) => self.renderList(data),
                complete: () => self.$emit('xhr:completed')
            });
        },

        abort(){
            this.$http && this.$http.abort();
        },

        clickItem(item){
            var self = this, value = item.value;

            self.$emit('item:click', item);

            if(self.size > 1){
                var index = self.value.indexOf(value);

                if(index > -1){
                    self.value.splice(index, 1);
                }else if(self.size == self.value.length){
                    return;
                }else{
                    self.value.push(value);
                }
            }else{
                self.value = [value];
            }

            self.$emit('change', self.val());
        },

        isRemoteSource(){
            return typeof this.source == 'string';
        },

        getItemClass(item){
            var self = this;
            var className = ['vmui-filter-item'], isSeled = false;

            if(self.value.indexOf(item.value) > -1){
                className.push('vmui-filter-selected');
                self.selectedClassName && className.push(self.selectedClassName);
            }

            return className.join(' ')
        }
    }
}
</script>