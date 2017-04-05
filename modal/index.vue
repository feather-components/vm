<template>
<Shade :visible="visibility" :fx="true">
    <Overlay :visible="true" :class="className" position="center">
        <section class="vmui-modal-header">
            <slot name="header"></slot>
        </section>
        
        <section class="vmui-modal-content">
            <slot></slot>
        </section>
       
        <section class="vmui-modal-footer">
            <slot name="footer"></slot>
        </section>
    </Overlay>
</Shade>
</template>

<style>
.vmui-modal{
    border-radius: 4px;
    width: 60%;
    padding: 16px 10px;
}

.vmui-modal-footer{
    margin-top: 14px;
    text-align: center;
}
</style>

<script>
import Overlay from '../overlay';
import Shade from '../shade';

export default{
    mixins: [Overlay],

    props: {
        buttons: {
            type: Object,
            default(){
                return {}
            }
        }
    },

    components: {
        Overlay,
        Shade
    },

    computed: {
        className(){
            return ('vmui-modal ' + (this.class || '')).trim()
        }
    }
}
</script>