## Toast

### 代码演示

```html
import {Toast} from 'vmui'  

Toast('提示语');
```  

### 全局方法
##### 组件提供了一些静态方法，使用方式和参数如下：

```html
this.$toast.success(content, [duration]);  
this.$toast.loading(content, [duration]);  
this.$toast.destroy();
```  

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
duration | 设置显示时间 | Number | 1000（1秒）
visible | 是否显示遮罩层 （可选参数） | Boolean ? | true
