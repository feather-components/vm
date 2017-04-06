<template>
<ul class="vmui-filterbox">
    <li v-for="source of sources">
        <list :source="source" :data-formatter="formatter"></list>
    </li>
</ul>
</template>

<style>

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

        formatter: {
            type: Function,
            default: null
        }
    },

    components: {
        List: List
    },

    data(){
        return {
            source: [this.items]
        };
    },

    methods: {
          
    }
}
</script>