filter组件
======================

filter组件集合中包含了4个组件：

* 单选filter

   ### Example

```html
<div id="test">
    <single-filter :source="[{label: '1', value: 1}, {label: '2', value: 2}]" @change="print"></single-filter>
</div>

<script>
require.async(['vue', 'vmui/filter'], function(Vue, Filter){
    new Vue({
        el: '#test',
        components: {
            SingleFilter: Filter.Single
        },

        methods: {
            print: function(v){
                console.log(v);
            }
        }
    });
});
</script>
```

   ### Props

    * source: Array 数据源，数据源的要求必须是对象数组，且对象必须有value属性
    * itemFormatter: Function 格式化输出的每一项的显示文字

```html
    <single-filter :source="[{label: '1', value: 1}, {label: '2', value: 2}]" :item-formatter="function(item){return item.label + 'lala'}"></single-filter>
```

    * disabled: Boolean 是否禁用
    * selectedClassName: String 选中后的class
    * fillHeight: Boolean 是否自动填充组件高度，默认为false


   ### Events

    * change: 当值改变时触发
    * reject: 拒绝选择操作时触发

* 多选filter

   ### Example

```js
//html同single
require.async(['vue', 'vmui/filter'], function(Vue, Filter){
    new Vue({
        el: '#test',
        components: {
            MultipleFilter: Filter.Multiple
        },

        methods: {
            print: function(v){
                console.log(v);
            }
        }
    });
});
```

   ### Props

    Props继承single的props

    * size: Number， 默认为-1，表示可无限选择
    * canBeSelect: Function，在点击筛选项时，会调用该函数判断当前是否可以继续进行选择，默认小于size都可以选择

   ### Events

    同single

* 多级联动单选

   ### Example

   #### 远程数据源

```html
<div id="test">
    <!--
    level指定3级， names指定远程请求时，每一级的id参数名
    -->
    <link-filter source="/ajax/filter.json" @change="print" :data-formatter="function(data){return data.data}" :level="3" :names="['province', 'city']"></link-filter>
</div>

<script>
require.async(['vue', 'vmui/filter'], function(Vue, Filter){
    new Vue({
        el: '#test',
        components: {
            LinkFilter: Filter.Link
        },

        methods: {
            print: function(v){
                console.log(v);
            }
        }
    });
});
</script>
```

```js
{
    "data": [
        {
            "label": "1",
            "value": 1
        },

        {
            "label": "2",
            "value": 2
        }
    ]
}
```

   #### 本地数据源

```html
<div id="test">
    <!--本地数据源多级必须存在children属性-->
    <link-filter :source="[
        {
            label: '1', value: 1, children: [
                {
                    label: '3',
                    value: 3
                }
            ]
        }, 
        {
            label: '2', value: 2, children: [
                {
                    label: '4',
                    value: 4
                }
            ]
        }
    ]" @change="print" :level="2"></link-filter>
</div>
```

   ### Props

    同single的props

    * source: Array|Object|String 为string则为远程请求， 如果是Object，需要通过dateFormatter进行格式化转换为数组
    * params: Object 请求时额外带的参数
    * names: Array 请求时，每一级的id参数名，如果为一个，则始终使用该值
    * level: Number 共多少级
    * dataFormatter: Function 进行数据的格式化

   ### Events

    同single的events

    * paths:change： 当点击路径改变时触发
    * xhr:success: 请求成功返回后触发
    * filter:render: 每一级渲染时触发

* 2级联动多选

   ### Example

```js
require.async(['vue', 'vmui/filter'], function(Vue, Filter){
    new Vue({
        el: '#test',
        components: {
            LinkMultipleFilter: Filter.LinkMultiple
        },

        methods: {
            print: function(v){
                console.log(v);
            }
        }
    });
});
```

   ### Props

    同link的props

    * size：Number 一共可以选择多少个二季选项
    * perSize: Number 每一个一级可以选择几个二级选项

   ### Events

    同link的eventss
