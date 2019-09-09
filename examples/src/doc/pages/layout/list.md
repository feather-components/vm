## List

### 代码演示

```html
<vm-list :api="api" :pulldown2refresh="true" :pullup2load="true">
    <template slot="row" slot-scope="props">
        <div>
            <img :src="props.data.img">
            <p>示例</p>
        </div>
    </template>
</vm-list>
```  

### Solts
名称 | 说明 | Slot-Scpoe/VNode
-----|-----|-------|------
header | 固定在列表滚动前顶部位置 | -
footer | 固定在列表滚动前后底部位置 | -
rows | 所有数据集合，用于渲染列表（需手动处理渲染列表） | slot -> row, slot-scpoe(props)
row | 列表循环后逐条数据渲染 | slot-scope(props)
if-loading | 正在加载时提示文字 | <loading \/\>正在加载中
if-failed | 加载失败时提示文字 | 网络异常，加载失败
if-empty | 返回空数组时提示文字 | 神马都木有
if-nomore | 最后一页时提示文字 | 就这么多啦

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
api | 设置请求地址，返回Promise（resolve[Array]）， | Object[Promise] | -
params | 请求参数（可设置固定参数 简化触发刷新操作更改参数后自动触发列表刷新） | Object | -
autoRefresh | 首次渲染时或Promise返回时，设置是否自动刷新 | Boolean | true
maxCountPerPage | 设置请求分页值 | Number | 20
pulldown2refresh | 下拉刷新 | Boolean | false
pullup2load | 上拉加载数据 | Boolean | false
scrollbars | 是否显示侧边滚动条 | Boolean | true

### Events
事件名称|说明|回调参数
-----|-----|-------|------
rows:render | 数据Render时触发 | function(rows) |
scrolling | 列表滚动时触发 | (event) => void |
nomore | 上拉加载数据没有更多数据时触发 | Function |
refresh | 列表刷新后触发 | Function |
fetch:success | 请求成功后触发 | function(data) |
fetch:fail | 请求失败后触发 | function(error) |
