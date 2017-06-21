LinkMultipleFilter
====================
2级联动多选

### Example

```js
import {LinkMultipleFilter} from 'vmui';
```

### Props
同link

* source: Array|Object|String 为string则为远程请求， 如果为数组,且第一项为string，则同样表示为远程请求，如果是Object，需要通过dateFormatter进行格式化转换为数组，
* params: Object 请求时额外带的参数
* names: Array 请求时，每一级的id参数名，如果为一个，则始终使用该值
* dataFormatter: Function 进行数据的格式化，如果通过ajax回来的数据中不存在value属性，可通过该函数格式化下
* size：Number 一共可以选择多少个二季选项
* perSize: Number 每一个一级可以选择几个二级选项

```html
<link-multiple-filter source="/data/filter.json" :value="{1: [1]}"></link-multiple-filter>
```

### Events

* paths:change： 当点击路径改变时触发
* xhr:success: 请求成功返回后触发
* filter:render: 每一级渲染时触发
* change: 当值改变时触发
* reject: 拒绝选择操作时触发
