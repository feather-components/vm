<template>
    <div class="vm-image">
        <loading v-if="!rurl" />
        <img :src="rurl" v-else />
    </div>
</template>

<script>
import _ from './_';
import Loading from '../loading';
import {Dom} from '../../helper';

const HEIGHT = Dom.height(document), WIDTH = Dom.height(document);

export default {
    name: 'image',

    props: {
        src: {
            type: String,
            default: null
        }
    },

    components: {
        Loading
    },

    mounted () {
        _.on(this);
        this.try2load();
    },

    data () {
        return {
            url: null,
            rurl: null
        };
    },

    methods: {
        try2load () {
            if (this.url) return false;

            const {top, left} = Dom.rect(this.$el);

            if (top < HEIGHT && left < WIDTH && left >= 0) {
                this.url = this.src;
                setTimeout(() => {
                    this.rurl = this.url;
                }, Math.random() * 1000);
                _.off(this);
            }
        }
    },

    activated () {
        !this.url && _.on(this);
    },

    deactivated () {
        _.off(this);
    },

    beforeDestroy () {
        _.off(this);
    }
};
</script>

<style>
.vm-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 340px;
    height: 200px;
}

.vm-image img {
    width: 100%;
}
</style>