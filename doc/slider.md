Slider
=============
滑动组件

```html
<div id="app">
    <slider @switch="slideTo">
        <slider-item style="height: 300px;">
            向右滑
        </slider-item>

        <!--可以为其他list，scroll等组件嵌套-->
        <slider-item />

        <slider-item style="height: 300px;">
            向左滑
        </slider-item>
    </slider>   
</div>
```

```js
import Vue from 'vue';
import {Slider, SliderItem} from 'vm';

new Vue({
    el: '#app',
    components:{
        Slider,
        SliderItem
    }
});
```


### Events

switch(to, from): 每次正常执行滑动行为后执行
switch:complete(to)：切换动画结束后