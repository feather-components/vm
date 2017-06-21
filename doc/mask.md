Mask
=============
遮罩组件

```html
<div id="app">
    <vm-mask :visible="true">
        <overlay position="center" :visible="true">lalala</overlay>
    </vm-mask>
</div>
```

```js
import {Mask, Overlay} from 'vmui';
import Vue from 'vue';

Vue.use(Mask);

new Vue({
    el: "#app",
    components: {
        Overlay
    }
});
```

### Props/Methods/Events 同Overlay