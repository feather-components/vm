Dateinput
=============
日历输入框，此组件为textinput和datepicker的组合组件, 参数同datepicker

```html
<div id="app">
    <dateinput label="选择日期" v-model="value" min-date="2017-01-01" />
</div>
```

### Props

* label: String 字段标题
* value: String 可直接使用v-model对其进行双向绑定
* minDate: String|Date
* maxDate: String|Date
* formatter: String， 格式化时间，如yyyy年mm月dd日，yyyy-mm-dd

### Slots

* label

### Events

* confirm