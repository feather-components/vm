<template>
    <masker v-model="visibility" class="vm-popup" @click.native="onMaskerClick">
        <overlay v-model="visibility" :position="position">
            <slot></slot>
        </overlay>
    </masker>
</template>

<script>
import Masker from '../masker';
import Overlay from '../overlay';

export default {
    name: 'popup',
    
    mixins: [Overlay],

    components: {
        Masker,
        Overlay
    },

    props: {
        clickBg2hide: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        onMaskerClick (e) {
            e.target === this.$el && this.clickBg2hide && this.hide();
        }
    }
};
</script>