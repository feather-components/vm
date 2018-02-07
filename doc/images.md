Images
=============
表单图片上传组件

```html
<div id="app">
    <images label="选择图片" v-model="images" :size="10" />
</div>
```

```js
import Vue from 'vue';
import {Images} from 'vm';

new Vue({
    el: '#app',
    data:{
        images: []
    },
    watch: {
        images(){
            console.log(arguments);
        }
    },
    components:{
        Images
    }
});
```


### Props

* label: String 字段标题
* tips: String 同其他垂直布局form组件的tips
* size: Number 最大上传数量 -1为无限
* value: Array 可直接使用v-model对其进行双向绑定
* dataFormatter: Function 用来格式化已上传成功返回的图片数据，图片需要处理成一个url格式
* uploader: String 上传url
* delEnabled: Boolean 是否使用删除按钮

### Slots

* label
* tips