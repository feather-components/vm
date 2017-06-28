TextInput
==================
文本输入框

```html
<div id="app">
    <text-input label="输入内容" v-model="input_value" placeholder="请输入手机号" />
</div>
```

```js
import Vue from 'vue';
import {TextInput} from 'vmui';

new Vue({
    el: '#app',
    data:{
        input_value: ''
    },
    components:{
        TextInput
    }
});
```

### Props

* multiline: Boolean 是否为多行文本，默认单行文本
* label: String text标题
* placeholder: String 
* readonly: Boolean 是否为多行文本，默认单行文本
* clearable: Boolean 是否启用清除内容icon
* value: String 可直接使用v-model对其进行双向绑定

### Events

* focus: 当输入框聚焦时触发
* blur: 当输入框失焦时触发
* clear: 清除当前input内的内容

### Slots

* msg：只有在多行文本时生效