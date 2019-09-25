form组件集合
================
form相关组件都是基于FormRow组件进行的封装，且可以通过v-model进行双向绑定，开发者也可以基于FormRow进行自己的组件扩展

### 代码演示
```html
<vm-form-row vertical-layout label="输入价格">
    <vm-input />
</vm-form-row>

<vm-form-row align="right" label="输入价格">
    <vm-input />
    <vm-forward :arrow-size="14"/>
</vm-form-row>

<vm-form-row label="icon checker">
    <vm-checker-group :options="years" icon-type @change="onCheckerChange" v-model="checkers" />
</vm-form-row>

<vm-form-row label="checker">
    <vm-checker-group :options="years" @change="onCheckerChange" v-model="checkers" />
</vm-form-row>

<vm-form-row label="textarea">
    <vm-textarea placeholder="多行文本" class="textarea" />
</vm-form-row>    

<vm-form-row label="开关切换" align="right">
    <vm-switch checked />
</vm-form-row>

<vm-button style="margin: 10px auto; width: 90%;" size="large" @click="submit">提交</vm-button>
```

```js
export default {
    data () {
        return {
            checkers: [2018],
            years: [
                {label: 2015, value: 2015},
                {label: 2016, value: 2016},
                {label: 2017, value: 2017},
                {label: 2018, value: 2018}
            ]
        }
    },
    methods: {
        submit () {
            ...
        },
        onCheckerChange (...args) {
            console.log(...args);
        }
    }
}
```

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
label | 表单标题文字 | String | null
align | 显示位置 | String | left
verticalLayout | 竖直排版 | Boolean | false