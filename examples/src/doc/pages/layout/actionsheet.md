## ActionSheet

### 代码演示

```html
<vm-actionsheet v-model="visible">
    <vm-actionsheet-item extras="啦啦啦">呵呵</vm-actionsheet-item>
    <vm-actionsheet-item disabled>不能用</vm-actionsheet-item>
    <vm-actionsheet-item>新增</vm-actionsheet-item>
    <vm-actionsheet-item @click="del">删除</vm-actionsheet-item>
</vm-actionsheet>
```  

### Slots
名称 | 说明 | Slot-Scpoe
-----|-----|-------|------
cancel | 可自定义取消按钮 | 取消

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
cancelDisabled | 是否隐藏取消按钮 | Boolean | false
actions | actions数据，如果设置则不需要手动构造actionsheet-item节点 | array\<actionsheet-item\> | null

### ActionSheetItem

属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
extras | 描述文字 | String | -
disabled | 是否可操作 | Boolean | false