Counter
=============
表单字段长度指令

Counter指令主要通过监听表单字段的长度变化，重写了 msg slot中的内容，注：counter只是用来显示文字长度，并不会对其做任何校验工作

### 使用

```html
<div id="app">
    <images label="选择图片" v-model="images" :size="10" v-counter="{limit: 10}" />
    <text-input label="用户名" v-model="username" v-counter="{limit: 20}" />
</div>
```

通过slot重写实现

```html
<div id="app">
    <images label="选择图片" v-model="images" :size="10">
        <template slot="msg">
            ({{images.length}}/10，至少上传一张图片)
        </template>
    </images>
</div>
```

### Props

* limit