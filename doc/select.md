Select
=============
下拉选择

```html
<div id="app">
    <v-select label="选择框" v-model="select_value" placeholder="请选择" :options="options" />
</div>
```

```js
import Vue from 'vue';
import {Select as vSelect} from 'vmui';

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
* options: Array 选项数组
* value: String 可直接使用v-model对其进行双向绑定