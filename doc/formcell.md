FormCell
==============
form相关组件的容器组件，开发者如果有需求，可自己基于formcell进行定制开发

```html
<vm-form-cell label="字段标题" tips="右上方文字提示">
    <input type="text" placeholder="自定义input" />
<vm-form-cell>
```

### Props

* label: 字段的label
* verticalLayout: 是否使用垂直布局，默认为垂直布局
* tips: 右上方的小文字提示，注：此属性只有在为垂直布局时生效

### Slots

* label：label的slot，进行深度定制

```html
<vm-form-cell>
	<template slot="label">
		输入文字
		<!--大于10个时，标红-->
		<span :class="{warn: val.length > 10}">
			({{val.length}}/10)
		</span>
	</template>
	
	<input type="text" v-model="val" />
</vm-form-cell>
```

* tips: 同label的slot，进行深度定制