## Popup

### 代码演示

```html
<vm-popup position="left">
    <div style="width: 100px; background: #fff; height: 100%;">从左边出现</div>
</vm-popup>

<vm-popup position="center">
    <div style="width: 100px; background: #fff; height: 100px; text-align: center;">在中间出现</div>
</vm-popup>
```  

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
position | 显示位置 | String | -
visible | 显示隐藏 | Boolean | false

### Events
事件名称|说明|回调参数
---|----|----
update:visible | 遮罩变更时触发 | boolean => void
show | 遮罩显示时触发 | () => void
hide | 遮罩隐藏时触发 | () => void