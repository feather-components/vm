LinkFilter
======================
多级联动

### Example

    #### 远程数据源

```html
<div id="test">
    <!--
    level指定3级， names指定远程请求时，每一级的id参数名
    -->
    <link-filter source="/ajax/filter.json" @change="print" :data-formatter="function(data){return data.data}" :level="3" :names="['province', 'city']"></link-filter>
</div>
```

```js
import {LinkFilter} from 'vm';
import Vue from 'vue';

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
```

```js
//ajax/filter.json
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

   #### 多个远程数据源

```html
<div id="test">
    <!--
    level指定3级， names指定远程请求时，每一级的id参数名
    -->
    <link-filter :source="['/ajax/filter-l1.json', '/ajax/filter-l2.json', '/ajax/filter-l3.json']" @change="print" :data-formatter="function(data){return data.data}" :level="3" :names="['province', 'city']"></link-filter>
</div>   
```

```html
<div id="test">
    <!--
    level指定3级， names指定远程请求时，每一级的id参数名
    第2级的url为null时，则自动使用第1级的url，如果第1级返回的数据中存在children属性，则不使用远程数据源
    -->
    <link-filter :source="['/ajax/filter-l1.json', null, '/ajax/filter-l3.json']" @change="print" :data-formatter="function(data){return data.data}" :level="3" :names="['province', 'city']"></link-filter>
</div>   
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

* source: Array|Object|String 为string则为远程请求， 如果为数组,且第一项为string，则同样表示为远程请求，如果是Object，需要通过dateFormatter进行格式化转换为数组，
* params: Object 请求时额外带的参数
* names: Array 请求时，每一级的id参数名，如果为一个，则始终使用该值
* level: Number 共多少级
* dataFormatter: Function 进行数据的格式化，如果通过ajax回来的数据中不存在value属性，可通过该函数格式化下
* itemFormatter: Function 格式化输出的每一项的显示文字
* unlimitLabel: String 当不限选项启用时显示的文字，默认为 不限
* unlimitValue: Number|String 设置不限选项的值，默认为undefined，表示不启用
* unlimitStartLevel: Number 第几层开始才启用不限，默认为0，表示第一级

```html
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
    ]" @change="print" :level="2" v-model="l_val"></link-filter>
```

### Events

* paths:change： 当点击路径改变时触发
* xhr:success: 请求成功返回后触发
* filter:render: 每一级渲染时触发
* change: 当值改变时触发
* reject: 拒绝选择操作时触发
