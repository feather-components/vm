## SearchBar

### 代码演示

```html
<vm-searchbar style="background: blue; " v-model="wd" :inner-style="{
    backgroundColor: '#fff', borderRadius: '0px'
    }" placeholder="请输入关键词，百度搜索" @click="onClick">
</vm-searchbar>
```  

```js
export default {
    data () {
        return {
            wd: ''
        };
    },
    methods: {
        onClick () {
           // TODO
        },
    }
}
```  

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
maxlength | 规定输入字段中的字符的最大长度 | Number | -
placeholder | 规定帮助用户填写输入字段的提示 | String | -
searchButtonEnabled | 显示隐藏搜索按钮 | Boolean | false
innerStyle | 自定义样式 | Object，String | false
readonly | 把输入字段设置为只读 | Boolean | false
autofocus | 规定输入字段在页面加载时是否获得焦点 | Boolean | false

### Events
事件名称|说明|回调参数
---|----|----
submit | 搜索提交时触发 | val => void
focus | 搜索框聚焦时触发 | () => void
blur | 搜索框失焦时触发 | () => void