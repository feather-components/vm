Lightbox
====================
相册组件

## Example

```html
<!--单独的-->
<div v-lightbox="{selector: 'img'/*默认*/, srcAttr: 'data-src'/*默认为src*/}">
	<img src="" data-src="" />
	<img src="" data-src="" />
	<img src="" data-src="" />
</div>
```

```html
<!--可与form的images上传组件一起使用-->
<images v-lightbox="{selector: 'img'/*默认*/, srcAttr: 'data-src'/*默认为src*/}" v-model="val"></images>
```