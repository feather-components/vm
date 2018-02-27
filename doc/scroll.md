scroll
===========
scroll组件


## Props

* scrollbars: Boolean 是否显示滚动条
* axis: String x|y可选，指定滚动方向
* ignores: String|Function|RexExp 判断哪些元素点击后无法滚动，String时为一个selector，RexExp则匹配元素的tagName(注意大小写)

## Example

```html
<scroll ignores=".ignore-scroll">
    xxxx
</scroll>
```

## slots

* header
* footer

## Methods

* refresh: 刷新当前scroll，内部元素结构或者高度等有调整时需手动触发
* scrollTo(pos, time = 0):  time不为0时，则不使用动画