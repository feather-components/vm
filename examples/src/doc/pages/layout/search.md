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
position | 显示位置 | String | -
visible | 显示隐藏 | Boolean | false

### Events
事件名称|说明|回调参数
---|----|----
update:visible | 遮罩变更时触发 | boolean => void
show | 遮罩显示时触发 | () => void
hide | 遮罩隐藏时触发 | () => void