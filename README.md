Vmui
================
基于vue的组件库


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

```js
//index.js
import {ActionSheet} from 'vmui';
ActionSheet({
    'xxx': function(){}
});
```

### webpack

## 组件列表

* [actionsheet](./doc/actionsheet)
* [alert](./doc/alert)
* [list](./doc/list)
* [page](./doc/page)
* [scroll](./doc/scroll)
* [search](./doc/search)
    * [bar](./doc/search/bar.md)
* [toast](./doc/toast)
* [topbar](./doc/topbar)
* [slider](./doc/slider)
* [form](./doc/form)
    * [text](./doc/form/text.md)
    * [select](./doc/form/select.md)
    * [tag](./doc/form/tag.md)
    * [box](./doc/form/box.md)
    * [file](./doc/form/file.md)
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
