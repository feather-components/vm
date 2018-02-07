Alert
==================

## Arguments 

* content: 警告框内容
* options: 定制化参数，不传递时，下一个参数会自动补前

```js
Alert('abc', {
    flex: true, //所有的按钮使用水平布局，位置不够自动换行
    buttons: {...}, //自定义所有的按钮
    extras: '1233', //小文字部分
    confirmButtonText: '啦啦啦' //确定按钮的文字显示
})
```

* callback: 点击确定时回调，只有在options.buttons为空时才生效。

```js
Alert('abc', () => {
    alert('点击了确定') 
});
```

## Example

```js
import {Alert} from 'vm';

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

## Alert.confirm(content, options, callback, cancelCallback) confirm模拟框

* options: 包含一个cancelButtonText, 表示取消按钮的文字

```js
import {Alert} from 'vm';

Alert.confirm('123', {
    cancelButtonText: '取消'
});
```