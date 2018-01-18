<template>
    <vm-page style="background: #eee;">
        <vm-topbar slot="header">Layout相关：box & row</vm-topbar>
        
        <vm-scroll>
        <vm-box>
            <template slot="header">
                <span>header slot</span>
                <vm-forward @click="alert(3);">查看更多信息</vm-forward>
            </template>
        	<vm-row @click="alert(3)">
                <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2981927988,4277275568&fm=27&gp=0.jpg" slot="icon" />
                <div>
                    商品名称
                    <div>商品价格</div>
                </div>
                <vm-forward>购物</vm-forward>
            </vm-row>
            <vm-row>
                <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2981927988,4277275568&fm=27&gp=0.jpg" slot="icon" />
                <div>
                    <div><span>商品名称</span>&nbsp;<span>商品副标题</span></div>      
                    <div>商品价格</div>
                </div>
                <vm-forward>购物</vm-forward>
            </vm-row>
            <vm-row><img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2981927988,4277275568&fm=27&gp=0.jpg" slot="icon" />啦啦啦</vm-row>
        </vm-box>
        
        <vm-box style="background: #fff;">
            <template slot="header">
                header
                <vm-forward @click="alert(3);">查看更多信息</vm-forward>
            </template>

            <vm-row @click="alert(3)">
                <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2981927988,4277275568&fm=27&gp=0.jpg" slot="icon" />
                <div>
                    商品名称
                    <div>商品价格</div>
                </div>
                <vm-forward>购物</vm-forward>
            </vm-row>
            <vm-row>
                <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2981927988,4277275568&fm=27&gp=0.jpg" slot="icon" />
                <div>
                    <div><span>商品名称</span>&nbsp;<span>商品副标题</span></div>      
                    <div>商品价格</div>
                </div>
                <vm-forward>购物</vm-forward>
            </vm-row>
            <vm-row><img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2981927988,4277275568&fm=27&gp=0.jpg" slot="icon" />啦啦啦</vm-row>
            <vm-forward @click="alert(3);" slot="footer">查看更多信息</vm-forward>
        </vm-box>
        <br />
        <div>
            <vm-row>
                <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2981927988,4277275568&fm=27&gp=0.jpg" slot="icon" />
                <div>
                    row外部不一定要包裹box
                </div>
                <div>商品描述</div>
                <vm-forward>购物</vm-forward>
            </vm-row>
            <vm-row>
                <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2981927988,4277275568&fm=27&gp=0.jpg" slot="icon" />
                <div>
                    商品名称
                    <div>商品价格</div>
                </div>
                <vm-forward>购物</vm-forward>
            </vm-row>
            <vm-row><img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2981927988,4277275568&fm=27&gp=0.jpg" slot="icon" />啦啦啦</vm-row>
        </div>
    </vm-scroll>
    </vm-page>
</template>

<style scoped lang="less">
	img{
        width: .2rem;
        height: .2rem;
    }
</style>

<script>
    export default{

    }
</script>