## Picker

### 代码演示

```html
<vm-picker title="title" @select="onSelect" :options="options" v-model="visible"></vm-picker>
```  
```js
export default {
    data () {
        return {
            options: [
                {label: 'option1', value: 1}, 
                {label: 'option2', value: 2}, 
                {label: 'option3', value: 3}, 
                {label: 'option4', value: 4}
            ],
            visible: false
        };
    },
    methods: {
        onShow () {
            this.visible = true;
        },
        confirm (str, arr) {
            console.log('您点击了确认')
        },
        onSelect (currData) {
            console.log(currData);
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