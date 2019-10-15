## Popover

### 代码演示

```html
<vm-popover slot="right">
    <a href="javascript:">操作</a>

    <template slot="actions">
        <vm-popover-action><i class="vm-iconfont vm-icon-up" slot="icon"></i> 相机</vm-popover-action>
        <vm-popover-action><i class="ion-ios-add icon"></i> 扫码</vm-popover-action>
        <vm-popover-action>连连看</vm-popover-action>
        <vm-popover-action style="color: #fff; font-weight: bold;">自定义一下</vm-popover-action>
    </template>
</vm-popover>

<vm-popover style="width: 50px; height: 30px; position: absolute; bottom: 40%; left: 45%;" message="hello, world">
    点击我
</vm-popover>
```  

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
position | 显示位置 | String | -
visible | 显示隐藏 | Boolean | false

### Events
事件名称|说明|回调参数
---|----|----
update:visible | 遮罩变更时触发 | Boolean
show | 遮罩显示时触发 | -
hide | 遮罩隐藏时触发 | -