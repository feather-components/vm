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

## Configs

* topFixed ：为控制ios和android屏幕top不一致问题

```js
import {Topbar} from 'vm';

if($.os.ios){
    //如果是苹果系统，则距离顶部10px
    TopBar.config('topFixed', '10px');
}
```

* bgColor: 背景色, 设置该值会对其他一些组件产生影响，比如search
* color: 文字颜色，
* borderBottom: 底部border