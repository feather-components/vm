## Switch

### 代码演示
```html
<vm-switch v-model="checked" />
```  
```js
export default {
    data () {
        return {
            checked: false
        }
    }
}
```

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
disabled | 设置或返回 switch 是否应被禁用 | Boolean | false
checked | 设置或返回 switch 是否应被选中 | Boolean | false
color | 设置switch颜色 | Boolean | false

### 全局配置
Vmui.config => switch.color