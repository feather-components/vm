## Dropdown

### 代码演示

```html
<vm-dropdown style="width: 50%;">
    <template v-slot:label="visible">
        <span>
            筛选
            <span :class="['t', visible ? 'ts' : '']">∨</span>
        </span>
    </template>
    <vm-scroll style="width: 100px; height: 300px; background: #fff" slot="box">
        <div v-for="(item, a) of 100" :key="a">{{item}}</div>
    </vm-scroll>
</vm-dropdown>

<vm-dropdown style="width: 50%;">
    筛选
    <vm-scroll axis="x" style="background: #fff;" slot="box">
        <div style="display: inline-block" v-for="(item, a) of 100">{{item}}</div>
    </vm-scroll>
</vm-dropdown>
```  

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
position | 显示位置 | String | -
visible | 显示隐藏 | Boolean | false

### Events
事件名称|说明|回调参数
---|----|----
update:visible | 遮罩变更时触发 | Boolean
show | 遮罩显示时触发 | -
hide | 遮罩隐藏时触发 | -