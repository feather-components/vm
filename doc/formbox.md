FormBox
==============
form相关组件的容器组件

```html
<form-box label="字段标题">
    <template slot="msg">这里是副标题</template>
    <input type="text" placeholder="自定义input" />
<form-box>
```

### Props

* verticalLayout: 是否使用垂直布局，默认为垂直布局

### Slots

* msg：副标题或者消息
