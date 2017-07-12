Iosselect
====================
select框

### Example

```js
import {Iosselect} from 'vmui';
```

### Props

* source: Array，选择对象，里面单个元素为{label: **, value: **}对象，
* initValue：Array，初始值，映射source元素的value值，默认第一个选中。

```html
	<input type="text"
	 v-model="val"@click="showIosselect">
	 
	 <iosselect :source="selectList" @confirm="onSure"  @close="close" v-if="show" v-model="val"></iosselect>
	 
	 <script>
	 ...
	 methods:{
	   showIosselect() {
		    this.show = true
		},
		close() {
		    this.show = false
		},
		...
	 }
	 ...
	 </script>
```
#### 注：上面可使用v-model进行父子元素的双向数据绑定，iosselect对此作了相关处理

### Events

* confirm： 点击确定，返回参数（values：选中对象的value数组,labels:选中对象的label数组,val: 选中对象元素）；
* change: 滚动触发，常用于动态改变source传入的元素，相关返回参数{done:** （异步回调函数，用于出发修改source元素，执行时需要传需要传入修改的数组和修改的source的index，如修改第2列的list，done（list，1））, val:**（当前选中的值）}；
* close: 关闭



