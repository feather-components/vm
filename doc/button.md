Button
====================
按钮

## Props

* type: String 按钮类型，可选main|drak|success
* small: Boolean 是否使用小按钮
* border: Boolean 使用空心按钮
* square: Boolean 边框无圆角
* disable: Boolean 是否禁用
* radius: Number 默认圆角的radius值

## Example

```html
<btn type="disable" :small="true" :square="true">提交<btn>
```

```js
import {Button} from 'vm';

Button.radius = 20; //指定所有的圆角button的radius都是20

new Vue({
    el: '#app',
    components: {
        Btn: Button
    }
});
```