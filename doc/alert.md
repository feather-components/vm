Alert
==================

## Arguments 

* content: 警告框内容
* options: 定制化参数，不传递时，下一个参数会自动补前
* manualClose: 是否手动关闭，不重写buttons时生效

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

## Example

```js
import {Alert} from 'vmui';

Alert('1233', () => {
    //2个按钮
    Alert('自定义alert', {
        extras: '说明文字',
        buttons: {
            '按钮1'(){
                Alert('点击了按钮1');
                this.destroy();
            },
            '按钮2'(){
                Alert('点击了按钮2');
                this.destroy();
            }
        }
    });
});
```

## Alert.confirm confirm模拟框

```js
import {Alert} from 'vmui';

Alert.confirm('123');
```