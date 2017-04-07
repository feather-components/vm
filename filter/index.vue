<template>
<div :class="'vmui-filter' + (this.visibility ? ' vmui-filter-open' : '')">
    <div class="vmui-filter-handler"><slot></slot></div>
    <Dropdown ref="dropdown">
        <Filterbox :children="children" :row-formatter="rowFormatter" :auto-render="false" ref="filterbox" :filter-style="{maxHeight: '300px'}">
            <template slot="footer">
                <slot name="footer"></slot>
            </template>    
        </Filterbox>
    </Dropdown>
</div>
</template>

<style>
.vmui-filter{
    height: .44rem;
    line-height: 44px;
}

.vmui-filter-handler{
    font-size: .14rem;
    color: #6281C2;
    display: inline-block;
    height: .44rem;
    margin: auto;
    width: 100%;
    text-align: center;
    line-height: .44rem;

    &:after{
        content: "";
        background: url(./filter_down@2x.png?__inline) no-repeat center center;
        height: .20rem;
        display: inline-block;
        width: .20rem;
        transform: translateY(.04rem);
        -webkit-transform: translateY(.04rem);
    }
}

.vmui-filter-open{
    .vmui-filter-handler:after{
        background: url(./filter_up@2x.png?__inline) no-repeat center center;
    }
}
</style>

<script>
import DropDown from '../dropdown';
import FilterBox from '../filterbox';
import _ from '../helper';

export default{
    props: {
        children: null,
        rowFormatter: null
    },

    components: {
        Filterbox: FilterBox,
        Dropdown: DropDown
    },

    data(){
        return {
            visibility: false
        };
    },

    mounted(){
        this.$refs.dropdown.$on('open', () => {
            this.visibility = true;
            this.$refs.filterbox.render();
            _.trigger(window, 'resize');
        });

        this.$refs.dropdown.$on('close', () => {
            this.visibility = false;
        })
    },

    methods: {
        toggle(){
            this.visibility ? this.close() : this.open();
        },

        open(){
            this.$refs.dropdown.open();
            this.$emit('open');
        },

        close(){
            this.$refs.dropdown.close();
            this.$emit('close');
        }
    }
}
</script>