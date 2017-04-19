slider
================================

## Example

```html
   <slider sid="slider1" :init-start="4000" :init-end="10000" :slider-number="2"
            :range-light="2" :min-value="1000" :max-value="20000"
            @update="updateSlider" :value="changeValue1"
    ></slider>
                
```

## props说明

| 选项 | 默认值 | 必填 | 说明 |
|----------|----------|----------|----------|
| sid |随机值 | N | id|
| init-start | /|Y | 初始值最小值|
| init-end | /| Y | 初始值最大值|
| slider-number | /| Y | 滑块个数|
| range-light | /| N | 滑块高亮范围（根据滑块个数，为2时，默认中间高亮，为1时，默认左高亮，设置为1，右高亮） |
| min-value | /| Y |最小范围 |
| max-value | /| Y |最大范围 |
| value | /| N |可通过外部设置滑块值|

##事件

'update','slide','set','change','start','end'



