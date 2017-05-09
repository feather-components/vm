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
require.async('vmui/actionsheet', function(ActionSheet){
    ActionSheet({
        'xxx': function(){}
    })
});
```

### webpack

## 组件列表

* [actionsheet](./actionsheet)
* [alert](./alert)
* [list](./list)
* [page](./page)
* [scroll](./scroll)
* [search](./search)
* [search/bar](./search/bar.md)
* [toast](./toast)
* [topbar](./topbar)
* [slider](./slider)
* [datepicker](./datepicker)
* [filter](./filter)
* [dropdown](./dropdown)
* [datepicker](./datepicker)
* [grid](./grid)
* [uploader](./uploader)
* [modal](./modal)
* [shade](./shade)
* [overlay](./overlay)


## 指令

* [actions](./actions)
* [draggable](./draggable.md)
* [tabs](./tabs)
