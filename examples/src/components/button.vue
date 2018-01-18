<template>
    <page>
        <topbar slot="header">button</topbar>
        <p><btn style="width: 1.5rem;">main</btn>&nbsp;&nbsp;<btn style="width: 1.5rem;" type="drak">drak</btn></p>
        <p><btn style="width: 1.5rem;" type="success">success</btn>&nbsp;&nbsp;<btn style="width: 1.5rem;" type="disable">disable</btn></p>
        <p><btn style="width: 1.5rem;" :small="true">main</btn>&nbsp;&nbsp;<btn style="width: 1.5rem;" type="drak" :small="true">drak</btn></p>
        <p><btn style="width: 1.5rem;" type="success" :small="true">success</btn>&nbsp;&nbsp;<btn style="width: 1.5rem;" type="disable" :small="true">disable</btn></p>
        <p><btn style="width: 1.5rem;" :border="true">main</btn>&nbsp;&nbsp;<btn style="width: 1.5rem;" type="drak" :border="true">drak</btn></p>
        <p><btn style="width: 1.5rem;" type="success" :border="true">success</btn>&nbsp;&nbsp;<btn style="width: 1.5rem;" type="disable" :border="true">disable</btn></p>
        <p><btn style="width: 1.5rem;" :square="true">main</btn>&nbsp;&nbsp;<btn style="width: 1.5rem;" type="drak" :square="true" >drak</btn></p>
        <p><btn style="width: 1.5rem;" type="success" :square="true">success</btn>&nbsp;&nbsp;<btn style="width: 1.5rem;" type="disable" :square="true">disable</btn></p>
        <p><btn style="width: 2rem; height: 0.3rem;" type="success">自定义尺寸</btn></p>
        <p><btn type="success">默认尺寸</btn></p>
        <p>

        </p>
    </page>
</template>

<style scoped>
p{
    margin: 10px 10px 0px 10px;
    text-align: center;
}
</style>

<script>
    import {
        Page,
        Topbar,
        Button as Btn
    } from 'vm';

    export default{
        components: {
            Page, 
            Topbar,
            Btn
        }
    }
</script>