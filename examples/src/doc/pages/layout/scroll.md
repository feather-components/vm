## Scroll

### 代码演示

```html
<vm-scroll>默认竖向滚动</vm-scroll>
<vm-scroll axios="x">横向滚动</vm-scroll>
```  

### Slots
名称 | 说明 | Slot-Scpoe
-----|-----|-------|
header | 固定在滚动顶部位置|-
footer | 固定在滚动底部位置|-


### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
scrollbars | 设置是否显示滚轴 | Boolean | false
axis | 设置横向或纵向滚动，可选参数x，y| String | y
disabled | 禁止触发滚动 | Boolean | false


### Events
事件名称|说明|回调参数
---|----|----
scrolling| 正在滚动时触发 | Event
draging| 移动时触发 | Pos