filter/single组件
======================
1级单选组件

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
<single-filter 
  :source="[{label: '1', value: 1}, {label: '2', value: 2}]" 
  :item-formatter="function(item){return item.label + 'lala'}"
>
</single-filter>
```

* disabled: Boolean 是否禁用
* selectedClassName: String 选中后的class
* fillHeight: Boolean 是否自动填充组件高度，默认为false


### Events

* change: 当值改变时触发
* reject: 拒绝选择操作时触发

