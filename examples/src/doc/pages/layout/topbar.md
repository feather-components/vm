## TopBar

### 代码演示

```html
1. <vm-topbar>页面标题</vm-topbar>
   
2. <vm-topbar>
    <div slot="left">back</div>
    <span>页面标题</span>
    <div slot="right">right</div>
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
