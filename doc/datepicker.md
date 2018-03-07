Datepicker
====================
时间选择器

#### 注：该插件是单独的日期选择器，不属于form，如需dateinput，点击查看文档[dateinput.md](./dateinput.md)

### Example

```js
import {Datepicker} from 'vm';
```

### Props

* formatter: 日期格式，默认：yyyy/mm/dd，其他格式：‘yyyy-mm-dd’，‘yy-mm-dd’，‘yy/mm/dd'’
* minDate: 最小日期，类型为字符串或者Date类型
* maxDate: 最大日期
* visible: 是否显示，默认显示
* value: 默认值，默认值的格式必须同formatter的格式，传递时使用v-model可进行双向绑定

```html
<template>
	<input type="text" v-model="val" @click="$refs.datepicker.open()">
	<datepicker format="yy-mm-dd" :visible="false" v-model="val" />
</template>
```
#### 注：上面可使用v-model进行父子元素的双向数据绑定，iosselect对此作了相关处理

### Methods

同overlay(open, close, destroy)

### Events

* confirm(date)： 点击确定时调用，此时会触发input事件（双向绑定）；
* close: 关闭