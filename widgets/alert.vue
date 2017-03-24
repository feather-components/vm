<template>
<Shade :visible="visibility">
    <Overlay :visible="true" :class="className" position="center">
        <section class="vmui-alert-content">
            <slot></slot>
            <section class="vmui-alert-extras">
                <slot name="extras"></slot>
            </section>
        </section>
       
        <section class="vmui-alert-buttons">
            <slot name="buttons"></slot>
        </section>
    </Overlay>
</Shade>
</template>

<style>
.vmui-alert{
    border-radius: 4px;
    width: 60%;
    padding: 16px 10px;
}

.vmui-alert-content{
    color: #3B4263;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 28px;
    text-align: center;
}

.vmui-alert-extras{
    margin-top: 10px;
    color: #555;
    font-size: 12px;
    line-height: 20px;
}

.vmui-alert-buttons{
    margin-top: 10px;
    text-align: center;
}
</style>

<script>
import Overlay from './overlay';
import Shade from './shade';

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
            return ('vmui-alert ' + (this.class || '')).trim()
        }
    }
}
</script>