<template>
<div :class="'vmui-dropdown' + (isOpen ? ' vmui-dropdown-open' : '')">
    <div class="vmui-dropdown-label" v-html="label" ref="label"></div>

    <dropbox ref="box">
        <div class="vmui-dropdown-inner">
            <slot></slot>
        </div>
    </dropbox>
</div>
</template>

<style>
.vmui-dropdown{
    height: .44rem;;
    line-height: 44px;
}

.vmui-dropdown-label{
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
        background: url(./down@2x.png?__inline) no-repeat center center;
        height: .20rem;
        display: inline-block;
        width: .20rem;
        transform: translateY(.04rem);
        -webkit-transform: translateY(.04rem);
    }
}

.vmui-dropdown-open{
    .vmui-dropdown-label:after{
        background: url(./up@2x.png?__inline) no-repeat center center;
    }
}

.vmui-dropdown-inner{
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
}
</style>

<script>
import _ from '../helper';
import Dropbox from '../dropbox';

export default{
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    
    components: {
        Dropbox
    },

    data(){
        return {
            isOpen: false
        }
    },

    mounted(){
        this.$nextTick(() => {
            var self = this;
            var $box = self.$refs.box;

            $box.setHandler(self.$refs.label);
            $box.$on('open', () => {
                self.isOpen = true;
            });

            $box.$on('close', () => {
                self.isOpen = false;
            })
        });
    },

    methods: {
        open(){
            this.$refs.box.open();
            this.$emit('open');
        },

        close(){
            this.$refs.box.close();
            this.$emit('close');
        }
    }
}
</script>