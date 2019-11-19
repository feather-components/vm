## Filter

### 代码演示

```html
<multiple-filter :source="source" v-model="m_val" :unlimit="1"></multiple-filter>

<link-filter :level="3" :source="source" v-model="l_val" :unlimit-value="-1" :unlimit-start-group="0"></link-filter>
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