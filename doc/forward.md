Forward
=============
forward组件封装了一个右箭头icon，用于避免开发者需要自己写icon的情况，另外还有个很特殊的地方，forward会自动识别当前环境来适应自己的位置。

### Example

```html
<div>
	<vm-forward>查看更多</vm-forward>
	lalal
</div>

<div>
	lalal
	<vm-forward>查看更多</vm-forward>
</div>
```

#### 你可以在任何点击跳转的地方使用该组件