<template>
<ul class="vmui-filterbox">
    <li v-for="source of sources" class="vmui-filterbox-group">
        <list :source="source" :data-formatter="dataFormatter" :row-formatter="rowFormatter" :showMsg="false" :fitHeight="false"></list>
    </li>
</ul>
</template>

<style>
.vmui-filterbox{
    display: -webkit-box;
    display: box;
}

.vmui-filterbox-group{
    -webkit-box-flex: 1;
    box-flex: 1;
    border-left: 1px solid #ccc;

    &:nth-child(1){
        border-left: 0px;
    }
}

.vmui-filterbox-item{
    height: .34rem;
    line-height: .34rem;
    text-align: center;
}
</style>

<script>
import List from '../list';
import _ from '../helper';

/*
[
    {
        label: "xxx",
        value: "xx",
        items: [

        ]
    } 
]
*/

export default{
    props: {
        items: {
            type: Array,
            default(){
                return [];
            }
        },

        match: {
            type: Function,
            default(value, data){
                return data;
            }
        }
        dataFormatter: null,
        rowFormatter: {
            type: Function,
            default(rowData){
                return '<div class="vmui-filterbox-item">' + rowData + '</div>';
            }
        }
    },

    components: {
        List: List
    },

    data(){
        return {
            sources: Array.isArray(this.items[0]) ? this.items[0] : [this.items] 
        };
    },

    mounted(){
        this.init();
    },

    methods: {
        init(){

        }
    }
}
</script>