<template>
    <ul class="vmui-grid">
        <li v-for="(item, index) in source" class="vmui-grid-item" :style="{width: 100 * itemPercent + '%'}">
            <slot name="cell" :data="item" :index="index">{{item}}</slot>
        </li>

        <li v-if="$slots.default" class="vmui-grid-item" :style="{width: 100 * itemPercent + '%'}"><slot></slot></li>
    </ul>
</template>

<style>
.vmui-grid{
    display: -webkit-flex;
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    flex-grow: 1;
    align-items: center;
    margin-top: 0.05rem;
}

.vmui-grid-item{
    text-align: center;
    word-break: break-all;
    margin-bottom: 0.05rem;
}
</style>

<script>
export default{
    props: {
        source: {
            type: Array,
            default(){
                return [];
            }
        },

        columns: {
            type: Number,
            default: 3
        }
    },

    watch: {
        columns(v){
            this.itemPercent = (1/v).toFixed(2);
        }
    },

    data(){
        return {
            itemPercent: (1/this.columns).toFixed(2)
        }
    }
}
</script>