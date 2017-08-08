Lazyload
=============
延迟加载图片，lazyload会适应容器内元素的变化来判定当前加载哪些图片


### 使用

```html
<div id="app">
    <div id="images" v-lazyload="{srcAttr: 'data-src', placeholder='未加载完成时的背景图片地址'}">
        <img data-src="1.png" />
        <br />
        <img data-src="2.png" />
        <br />
        <img data-src="3.png" />
        <br />
        <img data-src="4.png" />
        <br />
        <img data-src="5.png" />
        <br />
        <img data-src="6.png" />
        <br />
        <img data-src="7.png" />
        <br />
        <img data-src="8.png" />
        <br />
        <img data-src="9.png" />
        <br />
        <img data-src="10.png" />
        <br />
        <img data-src="11.png" />
        <br />
        <img data-src="12.png" />
        <br />
        <img data-src="13.png" />
        <br />
        <img data-src="14.png" />
        <br />
        <img data-src="15.png" />
        <br />
    </div>
</div>
```

### Options

* srcAttr: 指定读取src的属性是什么，默认lazyload不对具有src属性的元素进行加载
* placeholder