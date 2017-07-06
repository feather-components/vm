VM
================
vm是本团队在工作中总结出的一套基于vue的轻量级组件库，考虑团队和其他人使用的实际情况，实现的api调用和使用友好，form相关的都已实现双向
，且大量使用slot，提供开发者足够的拓展空间

### [例子演示](//vm.github.io)， 请在chrome控制台下切换成手机模式进行演示

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
```

### webpack

具体可见[webpack.config.js](./examples/webpack.config.js)


```js
//index.js
import {ActionSheet} from 'vm';
ActionSheet({
    'xxx': function(){}
});
```

## 注册全局，所有的组件以 vm- 开头， 指令除外

```js
import Vm from 'vm';
import Vue from 'vue';

Vue.use(Vmui);
```

```html
<vm-scroll></vm-scroll>
```

## 组件列表

* [ActionSheet](./doc/actionsheet.md)
* [Alert](./doc/alert.md)
* [List](./doc/list.md)
* [Page](./doc/page.md)
* [Scroll](./doc/scroll.md)
* [Search](./doc/search.md)
* [SearchBar](./doc/searchbar.md)
* [Toast](./doc/toast.md)
* [Topbar](./doc/topbar.md)
* [Form](./doc/form.md)
    * [TextInput](./doc/textinput.md)
    * [Select](./doc/select.md)
    * [Radios](./doc/radios.md)
    * [FormBox](./doc/formbox.md)
    * [Images](./doc/images.md)
    * [Checkboxes](./doc/checkboxes.md)
    * [Switch](./doc/switch.md);
* [Filter](./doc/filter.md)
    * [SingleFilter](./doc/filter/single.md)
    * [MultipleFilter](./doc/filter/multiple.md)
    * [LinkFilter](./doc/filter/link.md)
    * [LinkMultipleFilter](./doc/filter/link-multiple.md)
* [Dropdown](./doc/dropdown.md)
* [Grid](./doc/grid.md)
* [Uploader](./doc/uploader.md)
* [Mask](./doc/mask.md)
* [Overlay](./doc/overlay.md)
* [Popover](./doc/popover.md)

## 指令

* [Draggable](./doc/draggable.md)
* [Form/Counter](./doc/counter.md)