Box
=============
盒子组件，用于分块，通常和row组件 以及form的组件一起使用

### Slots

* header
* footer
* default

该组件的header和footer内的内容使用了flex space-between布局

### Example

```html
<vm-box>
	<vm-row>123</vm-row>
	<vm-row>456</vm-row>
</vm-box>	
```