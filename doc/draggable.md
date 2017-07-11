Draggable指令
====================
该指令实现了基本的拖拽功能，更多更强大的功能可以由该指令扩展，vm中很多组件都使用到了该指令，如scroll等

### Props

* axis|String: 拖拽轴，默认xy表示任意拖拽，可指定x或y
* stackTimes|Number: 粘度，可使用其做出粘性拖动效果，默认为1
* ignores|RegExp: 忽略哪些标签，匹配tagName
* canDrag|Function: 判定当前是否可拖拽的回调函数，默认 return true

```html
<div id="app">
    <div id="draggable" style="height: 100px; width: 100px; background: red;" v-draggable="{
        axis: 'xy',
        canDrag: canDrag
    }"></div>
</div>
```

```js
new Vue({
    el: '#app',
    methods: {
        canDrag(x/*当前x偏移*/, y, rx/*当前偏移距离上次偏移*/, ry){
            //只能在translateX为-100和0的区间内移动
            return x > -100 && x < 0;
        }
    }
});
```

### Methods

* stack(times|Number): 动态设置粘度

### Static Methods

* getTransform(element|HTMLElement): 静态方法，获取某个元素的transform

```js
import {Draggable} from 'vm';
console.log(Draggable.getTransform($('#test')));
```

### Events

* drag:start({x/*元素当前偏移值*/, y, pageX/*鼠标距离屏幕的X坐标*/, pageY, e})：鼠标按下后触发

```html
<div v-draggable @drag:start="onDragStart"></div>
```

* drag:reject({x, y, pageX, pageY, e})：未通过canDrag判定时触发
* drag:other({x, y, pageX, pageY, e})：如果当前拖拽时，是其他元素（这里主要用于2个可拖拽元素重叠时）
* draging({x, y, pageX, pageY, e})：拖拽中
* drag:end({x, y, e})：拖拽结束，鼠标弹起
