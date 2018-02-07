Checkboxes
=============
多选按钮组，checkboxes在少于4个时会自动采用水平布局，大于等于4个时自动采用垂直布局

```html
<div id="app">
    <checkboxes label="多选按钮组" v-model="value" :options="options" />
</div>
```

```js
import Vue from 'vue';
import {Checkboxes} from 'vm';

new Vue({
    el: '#app',
    data:{
        value: [],
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
        value(){
            console.log(arguments);
        }
    },
    components:{
        Checkboxes
    }
});
```


### Props

* label: String 字段标题
* options: Array 选项数组
* value: Array 可直接使用v-model对其进行双向绑定
* size: Number 默认-1，表示可任意选择

### Slots

* label
* tips：垂直布局生效