<template>
    <div :class="'vmui-dropdown' + (isOpen ? ' vmui-dropdown-open' : '')">
        <a class="vmui-dropdown-label" v-html="label" ref="label" href="javascript:"></a>

        <dropbox ref="box">
            <div class="vmui-dropdown-inner">
                <slot></slot>
            </div>
        </dropbox>
    </div>
</template>

<style lang="less">
    .vmui-dropdown{
        border-bottom: 1px solid #eee;
        flex: 1;
    }

    .vmui-dropdown-label{
        font-size: .14rem;
        text-decoration: none;
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
        max-height: 3.5rem;
    }
</style>

<script>
    import Dropbox from './box';
    import {Event} from '../../helper';

    export default{
        name: 'dropdown',

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
            var self = this;
            
            self.$nextTick(() => {
                var $box = self.$refs.box;

                $box.$on('open', () => {
                    self.isOpen = true;
                });

                $box.$on('close', () => {
                    self.isOpen = false;
                });
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