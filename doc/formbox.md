FormBox
==============
form相关组件的容器组件

```html
<box label="字段标题">
    <input type="text" placeholder="自定义input" />
<box>
```

### Slots

* msg-left: 显示在左边的消息内容
* msg-right: 显示在右边的消息内容 
* icon: icon, 可以通过指定icon slot，进行一些额外行为的定制

### Events

* icon:click: 点击icon时触发