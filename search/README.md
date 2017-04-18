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
* listOptions：Object， 同list组件参数，主要为source，params，rowFormatter，dataFormatter

# Slots

* header： 头部显示
* resdesc：搜索结果的描述
* default：搜索关键词为空时且empty2load为false时
* nores：搜索结果为空时显示

# Methods

* open
* close