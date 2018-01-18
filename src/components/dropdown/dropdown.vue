<template>
    <div :class="'vm-dropdown' + (isOpen ? ' vm-dropdown-open' : '')">
        <a class="vm-dropdown-label" ref="label" href="javascript:" :style="{
            color: !isOpen ? labelColor: labelHighColor
        }">
            {{label}}
            <icon :name="isOpen ? 'up' : 'down'" />
        </a>

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
        display: inline-block;
        height: .44rem;
        margin: auto;
        width: 100%;
        text-align: center;
        line-height: .44rem;
    }

    .vm-dropdown-inner{
        max-height: 3.5rem;
    }
</style>

<script>
    import Dropbox from './box';
    import {Event, Util} from '../../helper';
    import Icon from '../icon';

    var DropDown = {
        name: 'dropdown',

        props: {
            label: {
                type: String,
                default: ''
            },

            labelColor: {
                type: String,
                default: () => {
                    return DropDown.config('labelColor');
                }
            },

            labelHighColor: {
                type: String,
                default: () => {
                    return DropDown.config('labelHighColor');
                }
            }
        },
        
        components: {
            Dropbox,
            Icon
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

    Util.defineConfig(DropDown, {
        labelColor: '#6281C2',
        labelHighColor: '#6281C2'
    });

    export default DropDown;
</script>