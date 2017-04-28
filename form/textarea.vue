<template>
    <v-box :label="label">
        <img v-text="option.label" @click="select(option.value)" class="vmui-tag" v-for="(option, index) in options" :class="{'vmui-tag-selected': isChecked(option.value)}" />
        <input type="file" media="">+</a>
    </v-box>
</template>

<style>
</style>

<script>
import vBox from "./box";
</script>