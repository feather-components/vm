## Toast

### 代码演示

```js
import {Toast} from 'vmui'  

Toast('提示语');

Toast({ message: '操作成功操作成功操作成功<br>换行', duration: 3000 })
```  

### 全局方法
##### 组件提供了一些静态方法，使用方式和参数如下：

```js
var config = { 
    message: '配置提示语', 
    duration: 3000 
}
this.$toast.success(config);  
this.$toast.loading(config);  
this.$toast.destroy();
```  

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
type | 提示icon (可选参数[success,loading]) | String | -
message | 提示内容 | String | -
masker | 是否显示遮罩层 （可选参数） | Boolean | false
