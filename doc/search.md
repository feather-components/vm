Search
======================
searchview组件

## Props

* maxlength: Number 最大输入长度
* placeholder：String input的placeholder
* autofocus: Boolean 默认为true，自动获取焦点
* delay：Number 输入时延
* caching：Boolean 默认为true，是否缓存查询信息
* empty2load: Boolean 默认为false，如果输入为空时，同样做请求
* kw：String 请求时关键词的参数名，默认为kw
* source: Array|String 数据源，字符串为远程数据
* dataFormatter：Function，格式化数据，返回一个数组
* params：Object 请求远程时额外参数设置
* useHistory: Boolean 开启历史记录，注，历史记录只有在empty2load为false且关键词为空时才会显示出来
* historyMark: String 历史记录的id标识，用于处理应用history区分的时候
* closeAfterSelectHistory: Boolean 选择history时，是否关闭
* inputBgColor: String input框的背景色，可为rgba，默认为rgba(204, 204, 204, 0.2)

# Slots

* header： 头部显示
* desc：搜索结果的描述
* default：搜索关键词为空时且empty2load为false时
* nores：搜索结果为空时显示
* row: 记录行渲染

```html
<search ref="search" :visible="false" :fx="true" source="/list" @select="select" :data-formatter="function(data){return data.data}">
    <template slot="row" scope="props">
        <div>{{props.data.content}}</div>
    </template>
</search>
```

# Methods

* open
* close
* clearHistory 清空历史记录
