<template>
    <vm-page style="background: #fff;">
        <vm-topbar slot="header">button</vm-topbar>
        <p><vm-button >primary</vm-button></p>
        <p><vm-button size="large">large</vm-button></p>
        <p><vm-button size="mini">small/mini</vm-button></p>
        <p><vm-button type="black" hollow>空心</vm-button></p>
        <p><vm-button :square="true">方形</vm-button></p>
        <p><vm-button style="width: 200px; height: 30px" type="red">自定义尺寸</vm-button></p>
        <p><vm-button disabled>disabled</vm-button></p>
    </vm-page>
</template>

<style scoped>
p{
    margin: 10px 10px 0px 10px;
    text-align: center;
}
</style>

<script>
export default {

};
</script>