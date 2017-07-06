filter组件集合
======================
筛选组件集合

filter组件集合中包含了4个组件：

* [单选filte](./filter.md)
* [多选filter（参数事件继承于单选）](./multiple.md)
* [多级联动单选](./link.md)
* [2级联动多选（参数事件继承于多级联动单选）](./link-multiple.md)

### 4个组件均以实现双向绑定，开发者可通过v-model进行数据绑定

```js
import {Single, Link, Multiple, LinkMultiple} from 'vm/src/components/filter';
```