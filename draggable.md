Draggable
=====================
拖拽插件，一切包含拖拽功能组件的基类，scroll等基于此实现

## 使用

### 指令方式引用

```html
<div id="draggable" v-draggable="{axis: 'xy'}" @drag:start="onDragStart" @draging="onDraging" @drag:end="onDragEnd"></div>

<script>
require.async(['vue', 'vmui/draggable'], function(Vue, Draggable){
    new Vue({
        el: '#draggable',
        directives: {
            draggable: Draggable
        },
        //....
    });
});
</script>
```

### 对象方式

```js
import {Draggable} from Draggable;

var element = document.getElementById('draggable');

element.addEventListener('drag:start', () => {
    //listen 
});

new Draggable(element, {
    axis: 'y',   //只在Y轴移动
    canDrag(x, y, rx, ry){  //当y值当于0时才能拖拽
        return y >= 0;
    }    
});
```

## Options

* axis: xy|x|y 指定移动的方向
* canDrag: Function(x, y, rx/*与上次的move的x轴差距*/, ry) 默认随意移动，可通过重写参数进行对拖拽的控制


## Events

* drag:start

```js
element.addEventListener('drag:start', (event) => {
    //listen 
    //event.data.x: 当前元素的x位移
    //event.data.y: 当前元素y位移
    //event.data.event: 各阶段对元素操作的事件对象
    console.log(event.data.x, event.data.y, event.data.event);
});
```

* draging
* drag:end