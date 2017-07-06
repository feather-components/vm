Page
=============
PageView组件是overlay组件的一个派生，配合scroll和2个slot可很好的处理页面布局时，碰到的一些高度，滑入滑出动画问题

```html
<div id="app">
    <page>
        <topbar slot="header">标题</topbar>
        <scroll>
            自适应高度区域
        </scroll>
        <div class="footer" slot="footer">footer</div>
    </page>
</div>
```

```js
import {Page, Topbar, Scroll} from 'vm';


new Vue({
    el: "#app",
    components: {
        Page,
        Topbar,
        Scroll
    }
});
```

## Props/Events 同Overlay

## Slots

* header：顶部区域
* footer: 底部区域

## Methods

* open
* close

```js
this.$refs.page.open();
```