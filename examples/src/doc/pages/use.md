## 快速上手

### 安装

使用 npm 或者 yarn 进行安装

```shell
npm install github:feather-components/vm --save
yarn add github:feather-components/vm --save
```

### 代码中使用

入口文件

```js
//入口文件
import Vue from 'vue';
import VM from 'vmui';

Vue.use(VM, /*{
    组件库配置
}*/);
```

在.vue文件中引用组件时均以 <font color=red>vm-</font> 开头引用组件 

```html
<!--vue文件中引用-->
<template>
    <vm-scroll></vm-scroll>
    <vm-list></vm-list>
</template>
```

如果要单独引用，export出来的组件名都以驼峰形式定义。
**推荐使用vm-的方式直接使用**

```js
import {Scroll, Swiper, SwiperItem, List, Page} from 'vmui';

export default {
    components: {
        Scroll
    }
};
```

指令使用方式

```html
<div v-draggable="{axis: 'x'}"></div>
```
### [VM初始化配置](#/pages/config)