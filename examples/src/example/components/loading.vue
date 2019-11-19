<template>
    <vm-page style="background: #eee;">
        <vm-topbar slot="header">Loading 提示</vm-topbar>
        <br /><br />

        <vm-row>
            <img width="30" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2981927988,4277275568&fm=27&gp=0.jpg" slot="icon" />
            <div>
                商品名称
                <div>商品价格</div>
            </div>
            <vm-forward>
                <vm-loading />
            </vm-forward>
        </vm-row>
        <br /><br />
        <center><vm-loading :size="30" color="#000"/></center>

    </vm-page>
</template>

<style scoped>

</style>

<script>
export default {

};
</script>