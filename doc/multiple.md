filter/multiple组件
======================
1级多选

### Props

* source: Array 数据源，数据源的要求必须是对象数组，且对象必须有value属性
* itemFormatter: Function 格式化输出的每一项的显示文字
* size: Number， 默认为-1，表示可无限选择
* canBeSelect: Function，在点击筛选项时，会调用该函数判断当前是否可以继续进行选择，默认小于size都可以选择

```html
<multiple-filter 
  :source="[{label: '1', value: 1}, {label: '2', value: 2}]" 
  :item-formatter="function(item){return item.label + 'lala'}"
>
</multiple-filter>
```

```js
import {MultipleFilter} from 'vmui';
//new vue
```

* disabled: Boolean 是否禁用
* selectedClassName: String 选中后的class

### Events

* change: 当值改变时触发
* reject: 拒绝选择操作时触发

   
