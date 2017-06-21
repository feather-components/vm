Vmui
================
vmui是本团队在工作中总结出的一套基于vue的轻量级组件库，考虑团队和其他人使用的实际情况，实现的api调用和使用友好，form相关的都已实现双向
，且大量使用slot，提供开发者足够的拓展空间

## 使用

###  feather2

```sh
feather2 install feather-components/vmui
```

编译vue的单文件组件

```sh
npm install feather2-parser-vue fis-parser-es6-babel --save
```

conf/conf.js

```js
feather.config.set('project.fileType.js', 'vue');

feather.match('components/vmui/**.vue', {
    parser: ['vue', 'es6-babel']
});

feather.match('components/vmui/**.js', {
    parser: 'es6-babel'
});
```

### webpack

具体可见[webpack.config.js](./examples/webpack.config.js)


```js
//index.js
import {ActionSheet} from 'vmui';
ActionSheet({
    'xxx': function(){}
});
```

## 组件列表

* [actionsheet](./doc/actionsheet.md)
* [alert](./doc/alert.md)
* [list](./doc/list)
* [page](./doc/page)
* [scroll](./doc/scroll)
* [search](./doc/search)
* [searchbar](./doc/searchbar.md)
* [toast](./doc/toast)
* [topbar](./doc/topbar)
* [form](./doc/form.md)
    * [textinput](./doc/textinput.md)
    * [select](./doc/select.md)
    * [radios](./doc/radios.md)
    * [box](./doc/formbox.md)
    * [file](./doc/file.md)
    * [checkboxes](./doc/checkboxes)
* [datepicker](./doc/datepicker)
* [filter](./doc/filter)
    * [single](./doc/filter/single.md)
    * [multiple](./doc/filter/multiple.md)
    * [link](./doc/filter/link.md)
    * [link-multiple](./doc/filter/link-multiple.md)
* [dropdown](./doc/dropdown)
* [datepicker](./doc/datepicker)
* [grid](./doc/grid)
* [uploader](./doc/uploader)
* [modal](./doc/modal)
* [shade](./doc/shade)
* [overlay](./doc/overlay)


## 指令

* [actions](./doc/actions)
* [draggable](./doc/draggable.md)
* [tabs](./doc/tabs)
