Uploader
==============
上传组件

## Props

* multiple: Boolean 是否多选文件
* url: String 上传地址
* beforeUploadProcessor: Function 上传前的处理

```js
beforeUploadProcessor(files, next){
    //处理files，并回传回来
    next(files)   
}
```

* usePack: Boolean 是否打包上传，默认为true，如果为false，则文件是串行上传
* canUpload: Function 是否上传的判断函数
* accept: 接受的后缀 默认为*

## Event

* select
* upload:start
* upload:complete
* upload:error
* upload:progress
* upload:reject

## Slots

* default： 默认是一个icon