## DatePicker

### 代码演示

```html
<vm-datepicker v-model="visible" @confirm="confirm" formatter="2019/02/10" value="2019/02/10" max-date="2020/10/01 02:02" />
```  
```js
export default {
    data () {
        return {
            visible: false
        };
    },
    methods: {
        confirm (str, arr) {
            console.log(str, arr)
        }
    }
};
```

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
confirmText | 确认按钮 | String | 确定
cancelText | 取消按钮 | String | 取消
title | 标题文字 | String | -
minDate | 日期的最小可选值 | [String,Date] | 1970-01-01
maxDate | 日期的最大可选值 | [String,Date] | new Date()
formatter | 日期需要的格式 | String | yyyy/mm/dd
units | 展示格式 | Array | ['年', '月', '日','时','分']
### 全局配置
Vmui.config => datepicker.units   
Vmui.config => timepicker.units
### Events
事件名称|说明|回调参数
---|----|----
update:visible | 遮罩变更时触发 | boolean => void
confirm | 确定时触发（获取当前被选中的值） | (str, arr) => void
cancel | 隐藏时触发 | (bool) => void
select | 当前选择项 | (currData) => void