Topbar
==============
指定工具栏

## Options

* leftEnabled: Boolean 左边可用，默认会显示返回按钮，可通过对left slot的控制重写
* rightEnabled: Boolean 右边可用
* color: String 指定标题的字体颜色
* bgColor: String 指定topbar的背景颜色

## Slots

* left 左边
* right 右边区域

## topFixed 

该属性为静态属性，为控制ios和android屏幕top不一致问题

```js
import {Topbar} from 'vm';

Topbar.color = '#fff';
Topbar.bgColor = 'red';

if($.os.ios){
    //如果是苹果系统，则距离顶部10px
    TopBar.topFixed = '10px';
}
```