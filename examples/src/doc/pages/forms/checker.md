## Textarea

### 代码演示
```html
<vm-checker>选中</vm-checker>

<vm-checker square>确定</vm-checker>

<vm-checker-group :options="years" icon-type @change="onCheckerChange" v-model="checkers" />

<vm-checker-group :options="years" radio @change="onCheckerChange" v-model="checkers"></vm-checker-group>
```  

```js
export default {
    data () {
        return {
            years: [
                {
                    label: 2015,
                    value: 2015
                },
                {
                    label: 2016,
                    value: 2016
                },
                {
                    label: 2017,
                    value: 2017
                },
                {
                    label: 2018,
                    value: 2018
                }
            ],
            checkers: [2018]
        }
    },
    methods: {
        onCheckerChange (...args) {
            console.log(...args);
        }
    }
}
```

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
label | 指定文字 | String | -
disabled | 禁止改变状态 | Boolean | false
square | 设置圆角像素,可设置公共配置 | Boolean | false[,100px]
highColor | 设置是否为圆形，可设置公共配置 | String | -

### Events
事件名称|说明|回调参数
---|----|----
change | 切换是否选中状态 | checked => void

### Config
checker.square-radius   
checker.high-color   
checker.icon-size

### checker-group
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
options | 配置指定数据 | Array[Object{label,value}] | -
radio | 是否为单选 | Boolean | false
iconType | 是否显示iocn，可设置公共配置 | String | -