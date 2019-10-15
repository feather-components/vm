## Search

### 代码演示

```html
<vm-overlay v-model="overlayVisible" style="width: 100%; height: 100%;" position="right">
    <vm-search :api="api" v-model="wd" @confirm="hide" @cancel="hide" ref="search"></vm-search>
</vm-overlay>
```  

```js
export default {
    data () {
        return {
            wd: '',
            overlayVisible: false
        };
    },

    methods: {
        api (params) {
            if (typeof params == 'string') {
                params = {
                    wd: params
                };
            }

            return new Promise((resolve, reject) => {
                Ajax({
                    url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&cb=?',
                    data: params,
                    dataType: 'json',
                    success (data) {
                        resolve(data.s);
                    },
                    error () {
                        reject();
                    }
                });
            });
        },

        onClick () {
            this.overlayVisible = true;
            this.$refs.search.focus();
        },

        hide () {
            this.overlayVisible = false;
        }
    }
};
```

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
api | 设置请求地址，返回Promise[resolve:Array]， | Function:Promise | -
barStyle | 搜索框自定义样式 | String，Object | -
historyId | 制定搜索历史使用的标识 | - | [hash [,pathname]]
placeholder | 规定帮助用户填写输入字段的提示 | String | -
autofocus | 规定输入字段在页面加载时是否获得焦点 | Boolean | false
maxlength | 规定输入字段中的字符的最大长度 | Number | -

### Events
事件名称|说明|回调参数
---|----|----
input | 搜索时输入的内容 | value:[Number,String]
confirm | 点击搜索结果中的选中的值 | data:Any
cancel | 取消搜索 | -