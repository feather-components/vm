Button
====================
按钮

## Props

* type: String 按钮类型，可选main|drak|success
* small: Boolean 是否使用小按钮
* border: Boolean 使用空心按钮
* disabled: Boolean 是否禁用
* radius: Number 默认圆角的radius值

## Example

```html
<btn type="disable" :small="true" :radius="0">提交<btn>
```

```js
import {Button} from 'vm';

Button.config('radius', 20); //指定所有的圆角button的radius都是20

new Vue({
    el: '#app',
    components: {
        Btn: Button
    }
});
```

## Config

* radius: 设置全局按钮的radius值
* colors: 设置颜色风格，对应props里的type值，默认设置如下：

```js
Button.config('colors', {
    main: 'rgb(249, 104, 84)',
    success: 'rgb(98, 129, 194)',
    drak: '#3B4263'
});
```