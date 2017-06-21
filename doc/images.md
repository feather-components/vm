Images
=============
表单图片上传组件

```html
<div id="app">
    <images label="选择图片" v-model="files" :size="10" v-counter="{limit: 10}" />
</div>
```

```js
import Vue from 'vue';
import {File, Counter} from 'vmui';

new Vue({
    el: '#app',
    data:{
        files: []
    },
    watch: {
        files(){
            console.log(arguments);
        }
    },
    components:{
        File
    },

    directives: {
        Counter
    }
});
```


### Props

* label: String 字段标题
* size: Number 最大上传数量 -1为无限
* value: Array 可直接使用v-model对其进行双向绑定