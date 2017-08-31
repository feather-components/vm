<template>
    <div :class="'vm-dropdown' + (isOpen ? ' vm-dropdown-open' : '')">
        <a class="vm-dropdown-label" v-html="label" ref="label" href="javascript:"></a>

        <dropbox ref="box">
            <div class="vm-dropdown-inner">
                <slot></slot>
            </div>
        </dropbox>
    </div>
</template>

<style lang="less">
    .vm-dropdown{
        border-bottom: 1px solid #eee;
        flex: 1;
    }

    .vm-dropdown-label{
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

    .vm-dropdown-open{
        .vm-dropdown-label:after{
            background: url(./up@2x.png?__inline) no-repeat center center;
        }
    }

    .vm-dropdown-inner{
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
                    this.$emit('open');
                });

                $box.$on('close', () => {
                    self.isOpen = false;
                    this.$emit('close');
                });
            });
        },

        methods: {
            open(){
                this.$refs.box.open();
            },

            close(){
                this.$refs.box.close();
            }
        }
    }
</script>