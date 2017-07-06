Radios
=============
单选按钮组

```html
<div id="app">
    <radios label="单选按钮组" v-model="value" :options="options" />
</div>
```

```js
import Vue from 'vue';
import {Radios} from 'vm';

new Vue({
    el: '#app',
    data:{
        value: '',
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
        Radios
    }
});
```


### Props

* label: String 字段标题
* options: Array 选项数组
* value: String 可直接使用v-model对其进行双向绑定

### Slots

* msg