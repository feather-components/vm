datepicker
================================

## Example

```html

                
  <button v-datepicker @datepicker:change="showDate">显示时间</button>
                
```

## props说明

| 选项 | 默认值 | 必填 | 说明 |
|----------|----------|----------|----------|
| init-year | / | N | 初始化选定的年份|
|init-month |/| N | 初始化选定的月份|
| init-day | /| N | 初始化选定的日|

### 参数使用
```html

                
  <button v-datepicker="{initYear:2016,initMonth:2,initDay:28 }" @datepicker:change="showDate">显示时间</button>
                
```

## 事件

cancel:取消datepicker事件;
@datepicker:change:选择日期之后的事件，但是绑定在打开datepicker的按钮上


## 指令

v-datepicker:绑定在打开datepicker的按钮上，无需自己写js显示datepicker

