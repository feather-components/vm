Segment
====================
segment control组件， 该组件的选中项背景色继承于topbar

## Props

* items: Array
* color: String 未选中时的颜色
* bgColor: String 未选中时的背景颜色

## Methods

* to(index): 切换

## Events

* to(index, item)
* switch(index, item)

## Configs

* color: 全局设置
* bgColor: 全局设置背景色


```html
<vm-segment :items="['第一个', '第二个']"></vm-segment>
<vm-segment :items="[
    {
        label: '第一个',
        xxxx: 123
    }
]"></vm-segment>
```