Select
=============
表单下拉选择框，此组件组合了iosselect组件，所以点击时会自动打开iosselect

```html
<div id="app">
    <v-select label="选择框" v-model="select_value" placeholder="请选择" :options="options" />
</div>
```

```js
import Vue from 'vue';
import {Select as vSelect} from 'vm';

new Vue({
    el: '#app',
    data:{
        select_value: '',
        options:[
            {
                label: '不限',
                value: '0'
            },
            {
                label: '选项1',
                value: '1'
            },
            {
                label: '选项2',
                value: '2'
            }
        ]
    },
    watch: {
        select_value(){
            console.log(arguments);
        }
    },
    components:{
        vSelect
    }
});
```


### Props

* label: String 字段标题
* placeholder: String 
* options: Array 选项数组, 同iosselect组件的source
* value: String 可直接使用v-model对其进行双向绑定

#### 注： 当select只有一级时，则value不会一个数租，如果为多级时，则返回一个数租

### Slots

* label