VM
================
vm是本团队在工作中总结出的一套基于vue的移动端轻量级组件库，考虑团队和其他人使用的实际情况，实现的api调用和使用友好，form相关的都已实现双向
，且大量使用slot，提供开发者足够的拓展空间

### [例子演示](//vmui.github.io)， 请在chrome控制台下切换成手机模式进行演示

## 使用

###  feather2

```sh
feather2 install feather-components/vm
```

编译vue的单文件组件

```sh
npm install feather2-parser-vue fis-parser-es6-babel --save
```

conf/conf.js

```js
feather.config.set('project.fileType.js', 'vue');

feather.match('components/vm/**.vue', {
    parser: ['vue', 'es6-babel']
});

feather.match('components/vm/**.js', {
    parser: 'es6-babel'
});

//vm/rem.js不要使用define包裹，直接用<script src="vm/rem.js" head></script>的方式引入
feather.match('components/vm/rem.js', {
    useJsWraper: false
})
```

### webpack

具体可见[webpack.config.js](./examples/webpack.config.js)

#### 由于vm为了让适配更多的手机尺寸，故使用了rem进行尺寸的计算，所以在使用前，需要引入vm/rem.js文件

```html
<script src="vm/rem.js"></script>
```

```js
//index.js
import {ActionSheet} from 'vm';
ActionSheet({
    'xxx': function(){}
});
```

## 注册全局，所有的组件以 vm- 开头， 指令除外，我们强烈建议您注册全局

```js
import Vm from 'vm';
import Vue from 'vue';

Vue.use(Vm);
```

```html
<vm-scroll></vm-scroll>
```

## 关于Config

vm中有很多组件具备有配置，以方便开发者进行一些风格上的自定义以及一些全局props的设定，vm中统一了配置的规则，具有配置的组件都可以调用 .config(key, value) 进行设置或者获取配置

```js
Topbar.config('bgColor', '#000'); //将topbar的背景色改成黑色
Topbar.config({
    bgColor: '#000',
    color: '#fff'   //文字颜色改成白色
});

console.log(Topbar.config('bgColor'));
```

更多配置可见组件文档，一般正常具有icon或者常需进行风格定制的组件均已实现配置。

## 组件列表

* [Box](./doc/box.md)
* [Row](./doc/row.md)
* [Forward](./doc/forward.md)
* [ActionSheet](./doc/actionsheet.md)
* [Alert](./doc/alert.md)
* [Button](./doc/button.md)
* [List](./doc/list.md)
* [Page](./doc/page.md)
* [Scroll](./doc/scroll.md)
* [Pulldown2refresh](./doc/pulldown2refresh.md)
* [Search](./doc/search.md)
* [SearchBar](./doc/searchbar.md)
* [Toast](./doc/toast.md)
* [Topbar](./doc/topbar.md)
* [Form](./doc/form.md)
    * [TextInput](./doc/textinput.md)
    * [Textarea](./doc/textarea.md)
    * [Select](./doc/select.md)
    * [Radios](./doc/radios.md)
    * [FormCell](./doc/formcell.md)
    * [Images](./doc/images.md)
    * [Checkboxes](./doc/checkboxes.md)
    * [Switch](./doc/switch.md)
    * [DateInput](./doc/dateinput.md)
* [Filter](./doc/filter.md)
    * [SingleFilter](./doc/single.md)
    * [MultipleFilter](./doc/multiple.md)
    * [LinkFilter](./doc/link.md)
    * [LinkMultipleFilter](./doc/link-multiple.md)
* [Dropdown](./doc/dropdown.md)
* [Uploader](./doc/uploader.md)
* [Mask](./doc/mask.md)
* [Overlay](./doc/overlay.md)
* [Slider](./doc/slider.md)
* [Popover](./doc/popover.md)
* [Tabbar](./doc/tabbar.md)
* [Segment](./doc/segment.md)
* [Badge](./doc/badge.md)
* [Iosselect](./doc/iosselect.md)
* [Datepicker](./doc/datepicker.md)

## 指令

* [Draggable](./doc/draggable.md)
* [Badge](./doc/badge.md)
* [Lightbox](./doc/lightbox.md)
* [Lazyload](./doc/lazyload.md)
