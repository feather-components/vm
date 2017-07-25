Datepicker
====================
时间选择器

### Example

```js
import {Datepicker} from 'vmui';
```

### Props

* format: 日期格式，默认：yyyy/mm/dd，其他格式：‘yyyy-mm-dd’，‘yy-mm-dd’，‘yy/mm/dd'’
* minDate: 最小日期，格式必须与format匹配
* maxDate: 最大日期，格式必须与format匹配，用于select范围，默认为2010-1-1到2010-12-31

```html
<template>
...
	<input type="text" v-model="val"@click="showDatepicker">
	 
	<datepicker 
		@confirm="sureDate" 
		format="yy-mm-dd" 
		v-if="show" 
		@close="close" 
		v-model="dateValue"
	></datepicker>
...
</template>
	 
	 <script>
	 ...
	 methods:{
	   	showDatepicker() {
		    this.show = true
		},
		close() {
		    this.show = false
		},
		sureDate(value, label, val) {
			console.log(value, label, val)
		}
		...
	 }
	 ...
	 </script>
```
#### 注：上面可使用v-model进行父子元素的双向数据绑定，iosselect对此作了相关处理

### Events

* confirm： 点击确定，返回参数（values：选中的日期value数组,labels:选中的日期label数组,val: 选中日期对象）；
* close: 关闭



