Tabbar
====================
tab切换组件

## Props

* items: Object 一个对象
* defaultLabel： 默认的label

## Example

```html
<vm-tabbar :items="{
	'推荐': 0,
	'头条': 1,
	'美女': 2,
	'游戏': 3,
	'旅游': 4,
	'军事': 5,
	'游戏': 6,
	'智能': 7,
	'新世界': 8,
	'雪碧': 9,
	'可乐': 10,
	'购物': 11,
	'淘宝': 12,
	'苏宁易购': 13
}" @to="to"></vm-tabbar>
```

## Events

* to
* switch