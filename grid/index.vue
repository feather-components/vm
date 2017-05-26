<template>
    <ul :class="'vmui-grid vmui-grid-' + cols">
        <li v-for="(item, index) in source" class="vmui-grid-item" :style="{width: 100 * itemPercent + '%'}">
            <slot name="cell" :data="item" :index="index">{{item}}</slot>
        </li>

        <li v-if="$slots.default" class="vmui-grid-item" :style="{width: 100 * itemPercent + '%'}">
            <slot></slot>
        </li>
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
    box-sizing: border-box;
    padding: 0.05rem;
}

.vmui-grid-3{
    .vmui-grid-item{
        height: 1.09rem;
    }
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

        cols: {
            type: Number,
            default: 3
        }
    },

    watch: {
        cols(v){
            this.itemPercent = (1/v).toFixed(2);
        }
    },

    data(){
        return {
            itemPercent: (1/this.cols).toFixed(2)
        }
    }
}
</script>