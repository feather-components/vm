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
import {Switch as vmSwitch} from 'vm';

new Vue({
    el: '#app',
    data:{
        value: true
    },
    components:{
        vmSwitch    
    }
});
```


### Props

* label: String 字段标题
* value: String 可直接使用v-model对其进行双向绑定

### Slots

* label


### Configs

* color
