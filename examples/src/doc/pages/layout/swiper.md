## Swiper

### 代码演示

```html
<vm-swiper @switch="slideTo" axis="x">
    <vm-swiper-item>
        向右滑
    </vm-swiper-item>

    <vm-swiper-item>
        内容
    </vm-swiper-item>

    <vm-swiper-item>
        向左滑
    </vm-swiper-item>
</vm-swiper>
```  

### Props
属性 | 说明 | 类型 | 默认值
-----|-----|-------|------
axis | 设置横向或纵向滚动，可选参数x，y| String | x
defaultIndex | 默认索引 | Boolean | 0
autoplay | 自动开启滚动 | Boolean | true
interval | 滚动时间（毫秒） | Number | 5000
indicatorColor | 色值，可设置vmui公共配置 | String | swiper.indicator-color
indicatorActiveColor | 当前色值，可设置vmui公共配置 | String | swiper.indicator-active-color


### Events
事件名称|说明|回调参数
---|----|----
switch| 切换时触发 | index:Number, oldIndex:Number
draging| 移动时触发 | Event

### Config  
swiper.indicator-color   
swiper.indicator-active-color