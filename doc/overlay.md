Overlay
=============
弹层基类组件

## Props

* fx: Boolean 是否使用动画
* transition: String 动画名，默认为空，动画则和position配合产生效果
* position: String 组件出现的位置和动画效果 可选 center|left|right|top|bottom 默认为center
* visible: Boolean 是否可见

## Methods

* open
* close
* destroy

## Events

* open
* close
* destory

```html
<overlay position="right" style="width: 100px;" :visible="true" />
```

```js
import {Overlay} from 'vmui';
```