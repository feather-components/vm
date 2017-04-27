<template>
    <div>
        <label class="lm-label">
            <span class="lm-label-title" v-text="title"></span>
            <slot name="sub"></slot>
            <slot name="right"></slot>
        </label>
        <slot name=""></slot>
    </div>
</template>

<style lang="css">
import "../../legomini/build/legomini.css";
</style>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>