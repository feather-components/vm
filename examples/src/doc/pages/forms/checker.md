## Textarea

### 代码演示
```html
<vm-checker>选中</vm-checker>

<vm-checker-group :options="years" icon-type @change="onCheckerChange" v-model="checkers" />

<vm-checker-group :options="years" @change="onCheckerChange" v-model="checkers"></vm-checker-group>
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
placeholder | 规定帮助用户填写输入字段的提示 | String | -
readonly | 把输入字段设置为只读 | Boolean | false
maxlength | 规定输入字段中的字符的最大长度 | Number | -
autofocus | 规定输入字段在页面加载时是否获得焦点 | Boolean | false
