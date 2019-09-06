## List

### 代码演示

```html
<vm-list :api="api" :pulldown2refresh="true" :pullup2load="true">
    <div>
        <img src="xx.jpg">
        <p>示例</p>
    </div>
</vm-list>
```  

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
api | 设置请求地址，返回Promise | object[Promise] | -
params | 请求参数（可设置固定参数 简化触发刷新操作更改参数后自动触发列表刷新） | object | -
autoRefresh | 渲染时设置是否自动刷新 | boolean | true
maxCountPerPage | 设置请求分页值 | number | 20
pulldown2refresh | 下拉刷新 | boolean | false
pullup2load | 上拉加载数据 | boolean | false
scrollbars | 是否显示侧边滚动条 | boolean | true