page
===========
pageview组件


## Props

* visible：Boolean 隐藏显示
* fx：Boolean 是否启用动画
* position：String view在屏幕中的位置，默认为全屏，可通过left|bottom|right|top 来指定位置

```html
<!--侧边栏效果-->
<div id="page-test">
    <a href="javascript:" @click="pageVisible=true">显示侧边栏</a>

    <page position="left" :visible="pageVisible" :fx="true" :style="{width: '100px'}" ref="page">
        <ul>
            <li>我的行程</li>
            <li>客服</li>
            <li>设置</li>
        </ul>
    </page>
</div>

<script>
new Vue({
    el: '#page-test',
    data: {
        pageVisible: false
    }
})
</script>
```

## Slots

* header：顶部区域
* footer: 底部区域

## Methods

* open
* close

```js
this.$refs.page.open();
```