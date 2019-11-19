## Box & Row

### 代码演示

```html
<vm-box>
    <template slot="header">
        <span>header slot</span>
        <vm-forward>查看更多信息</vm-forward>
    </template>
    <vm-row>
        <img src="https://xxx.com/2981927988,4277275568.jpg" slot="icon" />
        <div>
            商品名称
            <div>商品价格</div>
        </div>
        <vm-forward>购物</vm-forward>
    </vm-row>
    <vm-row>
        <img src="https://xxx.com/2981927988,4277275568.jpg" slot="icon" />
        <div>
            <div><span>商品名称</span>&nbsp;<span>商品副标题</span></div>
            <div>商品价格</div>
        </div>
        <vm-forward>购物</vm-forward>
    </vm-row>
    <vm-row><img src="https://xxx.com/2981927988,4277275568.jpg" slot="icon" />啦啦啦</vm-row>
</vm-box>

<vm-box style="background: #fff;">
    <template slot="header">
        header
        <vm-forward>查看更多信息</vm-forward>
    </template>

    <vm-row>
        <img src="https://xxx.com/2981927988,4277275568.jpg" slot="icon" />
        <div>
            商品名称
            <div>商品价格</div>
        </div>
        <vm-forward>购物</vm-forward>
    </vm-row>
    <vm-row>
        <img src="https://xxx.com/2981927988,4277275568.jpg" slot="icon" />
        <div>
            <div><span>商品名称</span>&nbsp;<span>商品副标题</span></div>
            <div>商品价格</div>
        </div>
        <vm-forward>购物</vm-forward>
    </vm-row>
    <vm-row><img src="https://xxx.com/2981927988,4277275568.jpg" slot="icon" />啦啦啦</vm-row>
    <vm-forward slot="footer">查看更多信息</vm-forward>
</vm-box>
```

### Slot
名称 | 说明 | Slot-Scpoe
-----|-----|-------|------
icon | 自定义布局icon | -
