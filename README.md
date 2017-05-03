Vmui
================
基于vue的组件库


## 使用

###  feather2

```sh
feather2 install feather-components/vmui
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

* [actions](./actions)
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
