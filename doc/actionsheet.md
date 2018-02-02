ActionSheet
================================

## 使用

ActionSheet(items = {}/*可选项目*/, cancelDisabled = false/*是否禁用取消按钮*/)

## Example

```js
import {ActionSheet} from 'vm';

ActionSheet({
    '拨打电话 1234512345': function(){
        location.href = 'tel:1234512345'
    },

    'xxx': function(){}
});
```

如果有特殊需求，也可以对actionsheet进行定制，比如模拟微信风格的

```js
import {ActionSheet} from 'vm';

new Vue({
	....,

	components: {
		ActionSheet: ActionSheet.Component
	}
});
```

```html
<actionsheet :actions="actions" :visible="false" ref="def">
    <template slot="item" scope="props">
        <div style="background: #fff; height: 0.4rem; line-height: 0.4rem; border-bottom: 1px solid #eee;">
            {{props.text}}
        </div>
    </template>
    
    <div style="background: #fff; height: 0.4rem; line-height: 0.4rem;" slot="cancel">
        取消
    </div>
</actionsheet>
```