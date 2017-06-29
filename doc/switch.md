Switch
=============
切换按钮

```html
<div id="app">
    <vm-switch label="切换" v-model="value" />
</div>
```

```js
import Vue from 'vue';
import {Select as vmSwitch} from 'vmui';

new Vue({
    el: '#app',
    data:{
        value: true
    },
    components:{
        vmSelect
    }
});
```


### Props

* label: String 字段标题
* value: String 可直接使用v-model对其进行双向绑定
