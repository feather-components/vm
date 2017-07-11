SingleFilter
======================
1级单选组件

### Example

```html
<div id="test">
    <single-filter :source="[{label: '1', value: 1}, {label: '2', value: 2}]" @change="print" v-model="s_val"></single-filter>
</div>

<script>
import Vue from 'vue';
import {SingleFilter} from 'vm';

new Vue({
    el: '#test',
    components: {
        SingleFilter: SingleFilter
    },

    data(){
        return {
            s_val: 1
        }
    },

    methods: {
        print: function(v, label){
            console.log(v, label);
        }
    }
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


### Events

* change: 当值改变时触发
* reject: 拒绝选择操作时触发

