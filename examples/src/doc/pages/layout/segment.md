## Segment

### 代码演示

```html
<vm-segment :options="['第一个', '第二个', '第三个', '第四个']" @switch="onSwitch"/>
```  

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
options | segment数据配置 | Array | []
defaultIndex | 默认索引 | Number | 0
activeColor | 当前色值，可设置vmui公共配置 | String | segment.active-color
color | 色值，可设置vmui公共配置 | String | segment.color


### Events
事件名称|说明|回调参数
---|----|----
switch| 切换时触发 | index:Number, data?:Any