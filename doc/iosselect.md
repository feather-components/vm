Iosselect
====================
弹出式选择组件

### Example

```js
import {Iosselect} from 'vm';
```

### Props

* source: Array|String，选择对象，里面单个元素为{label: **, value: **}结构，如果不是，可通过dataFormatter进行格式化

```html
<input type="text" v-model="val"@click="$refs.iosselect.open()">
<iosselect :source="list" v-model="val" ref="iosselect" :visible="false"></iosselect>
```

```js
...
data(){
	return {
		list: [
			{
				label: '第一个',
				value: 1
			},

			{
				label: '第二个',
				value: 2
			}
		]
	};
}
...
```

	如果选择为多级时，可进行这样的赋值：

```js
...data(){
	return {
		list: [
			[
				{
					label: '第一组第一个',
					value: '1-1'
				}
			],

			[
				{
					'第二组第一个',
					value: '2-1'
				}
			]
		]
	}
}
```

	这种格式的数据不是无联动效果，只是多级效果，如果想多级联动时，可为item赋值一个children属性，则会自动变为多级联动:

```js
...data(){
	return {
		list: [
			{
				label: '第一组第一个',
				value: '1-1',
				children: [....]
			}
		]
	}
}
```	

	同时source还支持远程数据, 多个值时，效果只是多级，如果需要联动效果，需要一次将数据全部返回:
```html
...
<iosselect :data-formatter="formatSource" :source="['http://...', 'http://....']" />
```


```js
...
methods(){
	formatSource(data){
		return data.data;
	}
}	
```

* value：Array，初始值，映射source元素的value值，默认第一个选中，value被格式化后一定是返回一个数组。
* dataFormatter: Function, 对于每个数据源的处理


#### 注：上面可使用v-model进行父子元素的双向数据绑定，iosselect对此作了相关处理

### Events

* confirm(vals)： 点击确定会调用
* close: 关闭