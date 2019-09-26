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
options | 选择项，可直接对象数组,{label,value}格式 | Array | []
confirmText | 确认按钮 | String | 确定
cancelText | 取消按钮 | String | 取消
title | 标题文字 | String | -

### Events
事件名称|说明|回调参数
---|----|----
update:visible | 遮罩变更时触发 | boolean => void
confirm | 确定时触发（获取当前被选中的值） | (str, arr) => void
cancel | 隐藏时触发 | (bool) => void
select | 当前选择项 | (currData) => void