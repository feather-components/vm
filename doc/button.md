Button
====================
按钮

## Props

* type: String 按钮类型，可选main|drak|success|disable
* small: Boolean 是否使用小按钮
* border: Boolean 使用空心按钮
* square: Boolean 边框无圆角

## Example

```html
<btn type="disable" :small="true" :square="true">提交<btn>
```

```js
import {Button} from 'vm';

new Vue({
    el: '#app',
    components: {
        Btn: Button
    }
});
```