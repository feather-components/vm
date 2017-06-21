Toast
========
该组件为单例组件

* content 内容
* time 显示时长，为false时，需手动调用close方法
* useMask 是否使用黑色背景遮罩

Example

```js
Toast('12233', 4000, true);
```

## Success

```js
Toast.success('1233');
```

## Loading

```js
Toast.loading('1233', false, true);

setTimeout(() => {
    Toast.destroy();
}, 3000);
```