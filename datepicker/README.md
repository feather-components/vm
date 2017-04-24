datepicker
================================

## Example

```html
  <datepicker @cancel="closeDatepicker" :init-year="2016"
                :init-month="2" :init-day="29"></datepicker>
                
  <button v-datepicker @datepicker:change="showDate">12333</button>
                
```

## props说明

| 选项 | 默认值 | 必填 | 说明 |
|----------|----------|----------|----------|
| init-year | / | N | 初始化选定的年份|
|init-month |/| N | 初始化选定的月份|
| init-day | /| N | 初始化选定的日|

## 事件

cancel:取消datepicker事件;
@datepicker:change:选择日期之后的事件，但是绑定在打开datepicker的按钮上


## 指令

v-datepicker:绑定在打开datepicker的按钮上，无需自己写js显示datepicker

