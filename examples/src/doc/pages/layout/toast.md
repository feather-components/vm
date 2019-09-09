## Toast

### 代码演示

```html
Toast('提示语');

this.$toast({
    message: '操作成功操作成功操作成功<br>换行'
});
```  

### 全局方法
##### 组件提供了一些静态方法，使用方式和参数如下：
Toast.success(content, [duration], [visible])  
Toast.loading(content, [duration], [visible])  
Toast.destroy();

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
duration | 设置请求地址，返回Promise（resolve[Array]）， | Number | 1000（1秒）
visible | 是否显示遮罩层 （可选参数） | Boolean ? | true
