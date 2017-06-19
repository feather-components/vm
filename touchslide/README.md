touchslide
==============
指定工具栏
```html
<toolbarslide :loop="true" :auto="false" :use-shade="false" :imgs="imgs" ></toolbarslide>
```
## props说明

| 选项 | 默认值 | 必填 | 说明 |
|----------|----------|----------|----------|
| loop | false| N | 是否循环|
| auto | false| N | 是否自动轮播|
| imgs | []| y | 要轮播的图盘 |
| need-tag| false | N | 图片上的小圆点 |
| need-total| false | N | 显示总张数和当前滚动到第几张 |

## 事件
| nowpage|  | y | 返回当前轮播的页数，滚动完一次调用一次 |

##imgs格式
```js
    imgs:[{src:"http://dfs.anhouse.com/view/1897dfc83c70666db36abc29c022b528917c304b/900x675.jpg"},
        {src:"http://dfs.anhouse.com/view/f59c670ecf0c6d477c0d37b96f34957344e2d669/900x675.jpg"},
        {src:"http://dfs.anhouse.com/view/75ccadb6df249dda8b5cc5a4dbf6e43afbd7bac3/900x675.jpg"},
        {src:"http://dfs.anhouse.com/view/5c22c606e464a0875d795142bac6103b48446c73/900x675.jpg"},]
```

、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、


```html
<toastslide :loop="true" :auto="false" :use-shade="true"  :imgs="imgs" v-if="canvisible" @isvisible="changeVisible" ></toastslide>

```

## props说明

| 选项 | 默认值 | 必填 | 说明 |
|----------|----------|----------|----------|
| loop | false| N | 是否循环|
| auto | false| N | 是否自动轮播|
| use-shade | /| N | 是否需要阴影背景|
| imgs | []| y | 要轮播的图盘 |
| init-index | 0| n | 默认滚动到第init-index张图片 |



## 事件
| 选项 | 默认值 | 必填 | 说明 |
|----------|----------|----------|----------|
| isvisible |  | Y | 点击弹框空白处回调方法，主要用来控制控件是否显示 |
| visibility | true | N |  一般用来控制控件是否显示，组件要用， |
| getpage |  | y | 返回当前轮播的页数, 滚动完一次调用一次|

## js 说明

```js
    imgs:[
        {src:"http://dfs.anhouse.com/view/1897dfc83c70666db36abc29c022b528917c304b/900x675.jpg"},
        {src:"http://dfs.anhouse.com/view/f59c670ecf0c6d477c0d37b96f34957344e2d669/900x675.jpg"},
        {src:"http://dfs.anhouse.com/view/75ccadb6df249dda8b5cc5a4dbf6e43afbd7bac3/900x675.jpg"},
        {src:"http://dfs.anhouse.com/view/5c22c606e464a0875d795142bac6103b48446c73/900x675.jpg"},
    ]

 changeVisible(index){
     console.log(index)
 }
```