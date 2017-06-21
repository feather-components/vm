alert
==================

## Options 

* content: 警告框内容
* options: 定制化参数，不传递时，下一个参数会自动补前

```js
Alert('abc', {
    extras: '这里是额外的说明',
    //重写按钮
    buttons: {
        '拨打电话': function(){
            location.href = 'tel:123';
            this.close();
        }
    }
})
```

* callback: 点击确定时触发的回调函数

```js
Alert('abc', /*options参数, */ function(){
    alert('点击了确定') 
});
```

* manualClose: 是否手动关闭，不重写buttons时生效

## Example

```js
import {Alert} from 'vmui';

Alert('1233');
Alert.confirm('123');
```