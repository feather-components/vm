## TopBar

### 代码演示

```html
<vm-topbar style="background:#ff0">页面标题</vm-topbar>
   
<vm-topbar>
    <span>自定义右边按钮</span>
    <div slot="right">
        <a>添加</a>
    </div>
</vm-topbar>
```  

### Slot
名称 | 说明 | Slot-Scpoe
-----|-----|-------|------
left | 左边按钮，默认执行history.back() | <icon \/\>
right | 右边按钮 | -

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
leftEnabled | 是否显示左边区域 | Boolean | true
rightEnabled | 是否显示右边区域 | Boolean | true
