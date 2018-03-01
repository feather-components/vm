Textarea
==================
多行文本输入框

```html
<div id="app">
    <vm-textarea label="输入内容" v-model="input_value" placeholder="输入文字描述">
    	。。。。。这里是备注
    </vm-textarea>
</div>
```


### Props

* label: String text标题
* tips：右上角小tips，可以用来做一些字数限制之类的提示
* placeholder: String 
* readonly: Boolean 是否为多行文本，默认单行文本
* value: String 可直接使用v-model对其进行双向绑定

### Events

* focus: 当输入框聚焦时触发
* blur: 当输入框失焦时触发
* clear: 清除当前input内的内容

### Slots

* label
* tips
* default
* icon: 多行文本自动采用垂直布局，但是为了满足部分多行文本右侧有时候会出现小icon的情况，可使用该slot实现