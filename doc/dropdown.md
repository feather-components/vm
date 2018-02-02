Dropdown
====================
下拉组件，该组件仅做按钮及下拉功能，开发者可通过重写slot达到下拉组合的效果

## Props

* label: String 按钮显示的文字

## Example

```html
<dropdown label="筛选" style="width: 50%; float: left;">
    <single-filter source="..."></single-filter>
</dropdown>

<dropdown label="地区/区域/城市" style="width: 50%; float: left;">
    <link-filter source="..."></link-filter>
</dropdown>
```

## Events

* open
* close

## Config

* labelColor: 文字颜色
* labelHighColor: 被选中时的颜色

```js
Dropdown.config({
	labelColor: '...',
	labelHighColor: '...'
});
```