## Alert

### 代码演示

```html
import {Alert} from 'vmui';

Alert('hello，我是alert');
```  

### 全局方法
##### 组件已挂载Vue，使用方式和参数如下：  
```js
this.$alert('hello，我是alert');   

var $confirm = this.$confirm('我是confirm，请点击确定', {
    buttonClick2hide: false
});  
$confirm.$on('cancel', () => {  
    this.$confirm('确定取消吗？').$on('confirm', () => {  
        $confirm.destroy();  
    });  
}).$on('confirm', () => {  
    this.$alert('你点击了确定');  
    $confirm.destroy();  
});
```  

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
title | 提示文字标题 | String | -
message | 提示信息 | String | -
confirmButton | 确认按钮文字 | String | 确定
cancelButton | 取消按钮文字 | String | -


### Events
事件名称|说明|回调参数
---|----|----
confirm|点击确认触发|-
cancel|点击取消触发|-