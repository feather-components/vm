<template>
<ul class="vmui-filterbox">
    <li v-for="source of sources" class="vmui-filter-group">
        <list :source="source" :data-formatter="dataFormatter" :row-formatter="rowFormatter" :showMsg="false" :fitHeight="false"></list>
    </li>
    <li v-for="source of sources" class="vmui-filter-group">
        <list :source="source" :data-formatter="dataFormatter" :row-formatter="rowFormatter" :showMsg="false" :fitHeight="false"></list>
    </li>
</ul>
</template>

<style>
.vmui-filterbox{
    display: flex;
    flex-direction: row;
}

.vmui-filterbox-group{
display:flex;
flex-direction: column;
    flex: 1;
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

export default{
    props: {
        items: {
            type: [Object, Array],
            default(){
                return {};
            }
        },

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
            sources: [this.items]
        };
    },

    mounted(){
        console.log(this.sources);
    }
}
</script>