ranger
================================

## example
```html
  <div style="margin-top:20px">
      <ranger @ondragstart="dragstart" @onupdating="updating" @ondragend="updated" ></ranger>
  </div>
  
  <div style="margin-top:20px">
      <ranger @ondragstart="dragstart" @onupdating="updating" @ondragend="updated" :slider-num="2" :val="val"></ranger>
  </div>
                
```

## props说明
| 选项 | 默认值 | 必填 | 说明 |
|----------|----------|----------|----------|
| range | [300,1000]| N | 范围|
| initRange| [400,1000]|N | 初始值范围 |
| slider-num | 1| N | 滑块个数|
| label-show | true| N | 是否需要头部数值标签块|
| val |/| N | 可手动设置值|

## 事件
'ondragstart','updating','ondragend'

## slot
label-min：label块左侧<br/>
label-max：label块右侧<br/>
label-value：label块值显示<br/>




