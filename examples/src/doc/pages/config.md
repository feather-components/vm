## 配置

vm中提供了足够多的的配置项目供开发者灵活修改，其中包括大量的颜色配置，不同于其他组件库对于修改样式方面相对较为困难（比如只提供一种样式，或需要重新定义less相关文件）

[查看原始配置](https://github.com/feather-components/vm/blob/master/src/cfg.default.js)

```js
Vue.use(VM, {
    'theme': '#ccc', //定义主题, 该配置对很多未定义颜色生效
    'topbar.padding-top': isAnroid() ? '0px' : '22px' //此处可定义topbar使用时是否自动留出statusbar的height
});
```

更多配置可自行尝试，vm的配置项还是很容易能看懂的。