Row
=============
row组件，通常和box组件一起使用，达到类似ios中 标签卡列表的效果， 所有的form的组件都继承于该组件

### Events

* click

### Slots

* icon
* default

该组件的左侧会自动缩进12个px，开发者也可通过style自行修改，多个row组件写在一起时，会形成一个盒子结构
组件内的所有元素水平排列，并进行垂直居中

### Example

```html
<div>
	<vm-row>1</vm-row>
	<vm-row>2</vm-row>
	<vm-row>3</vm-row>
</div>

<vm-box>
	<vm-row>1</vm-row>
	<vm-row>2</vm-row>
	<vm-row>3</vm-row>
</vm-box>
```