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

* rowFormatter: Function 格式化每条渲染出来的html

```html
<div id="list-container">
    <list :source="{data: [{title: '第1行', desc: 'lalala'}, {title: '第2行', desc: 'lalala'}]}" :data-formatter="function(data){return data.data;}" :row-formatter="rowFormatter"></list>
</div>

<script>
new Vue({
    el: '#list-container',
    components: {
        List: List
    },
    methods: {
        //遍历data
        rowFormatter: function(item){
            return '<div class="header">' + item.title + '</div><div class="contente">' + item.desc + '</div>';
        }
    }
});
</script>
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

```html
<list>
    <div slot="header">这里是头部</div>
    <div slot="nores">无结果时显示我</div>
</list>
```