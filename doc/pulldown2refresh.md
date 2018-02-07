pulldown2refresh
===========
该组件继承于scroll组件，主要用于下拉刷新数据的一些展示需求，该组件本身只是展示了下拉的效果，并不会真正请求，需开发者自行使用


## Methods

* refresh
* scrollTo
* recover

## Slots

* pulldown-msg： 当正在下拉时显示的内容
* pullleave-msg：当拖动到刷新阈值时显示的内容
* refresh-msg：刷新时显示的内容

## Events

* refresh(recover): 当刷新时触发的时间，这个时候开发者需要自行去请求数据，recover参数为一个函数，请求数据返回后调用，可将组件还原回原先的位置

```html
<pulldown2refresh @refresh="onRefresh">
	<!--显示的内容-->
</pulldown2refresh>
```

```js
...
methods: {
	onRefresh(recover){
		$.ajax(....).then(recover)
	}
}
```