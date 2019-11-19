## Image

### 代码演示
* 图片异步加载
```html
<vm-image src="http://xx.com/96d8cf0375f64c24a819d50ae190b51820170601175516.jpeg" />

<vm-image :src="url" />
```  

```js
export default {
    data () {
        return {
            url: '',
            src: 'http://xx.com/96d8cf0375f64c24a819d50ae190b51820170601175516.jpeg'
        };
    },
    mounted () {
        setTimeout(() => {
            this.url = this.src;
        }, 1000);
    }
};
```

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
src | 图片地址 | String | -
