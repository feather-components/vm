SearchBar
======================
搜索工具

## Props

* maxlength: Number 最大输入长度
* placeholder：String input的placeholder
* readonly：Boolean 是否只可读，一般情况下用于配合search组件使用
* theme: String 风格可选 blue

## Events

* focus
* input

```js
<div id="search-bar">
    <searchbar @input="print" @submit="submit"></searchbar>
</div>

<script>
new Vue({
    el: '#search-bar',
    data: {
        v: ''
    },
    methods: {
        print: function(v){
            this.v = v;
        },

        submit: function(){
            //do ajax
        }
    }
});
</script>
```

* submit
* click

## Methods

* focus
* blur
* clear：清空输入内容，此方法会触发input事件