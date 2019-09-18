## Tabs

### 代码演示

```html
<vm-tabs :headers="['推荐','头条']">
    <vm-tabs-pane>推荐</vm-tabs-pane>
    <vm-tabs-pane>头条</vm-tabs-pane>
</vm-tabs>
```  

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
defaultIndex | 默认选中索引 | Number | 0
headersStyle | 自定义tabs的样式 | String,Object | 
headers | tabs数据配置 | Array | [] 
headerActiveColor | 色值，可使用vmui公共配置 | String | tabs.header-active-color
