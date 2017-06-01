list
===========
该列表组件，自动集成了scroll功能，并支持下拉刷新，上滑加载功能

## Props

```html
<div id="list-container">
    <list :source="[1, 2, 3]"></list>
</div>
```

* params: Object 远程数据源请求时所带的参数

```html
<div id="list-container">
    <list :source="http://abc.com/list.json" :params="{kw: '123'}"></list>
</div>
```

* dataFormatter: Function 格式化数据源，输出必须为一个数组

```html
<div id="list-container">
    <list :source="{data: [1, 2, 3]}" :data-formatter="function(data){return data.data;}"></list>
</div>
```

* pulldown2refresh: 开启下拉刷新

```html
<div id="list-container">
    <list :source="{data: [{title: '第1行', desc: 'lalala'}, {title: '第2行', desc: 'lalala'}]}" :data-formatter="function(data){return data.data;}" :row-formatter="rowFormatter" :pulldown2refresh="true"></list>
</div>
```

* pullup2load: 上滑加载下一页

```html
<div id="list-container">
    <list :source="{data: [{title: '第1行', desc: 'lalala'}, {title: '第2行', desc: 'lalala'}]}" :data-formatter="function(data){return data.data;}" :row-formatter="rowFormatter" :pullup2load="true"></list>
</div>
```

## Slot

* header： 组件头部显示
* nores： 无结果时显示
* row: 每条渲染

```html
<list source="/list" :data-formatter="function(data){return data.data}" :pulldown2refresh="true" :pullup2load="true" ref="list">
    <div slot="header">这里是头部</div>
    <div slot="nores">无结果时显示我</div>

    <!--可见vue官网scope slot文档-->
    <template slot="row" scope="props">
        <div class="list-item">
            <div class="list-item-inner">
                <p> {%props.data.name%} </p>
                <p>（一期）</p>
                <p class="row-content"> {%props.data.content%} </p>
                <a href="javascript:" class="action" @click="callTel(12345678901)">拨打电话</a> | 
                <a href="javascript:" class="detail" @click="openDetail">详情</a>
            </div>
        </div>
    </template> 
</list>
```