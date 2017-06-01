actions
===========
点击下拉式动作，该组件为指令

## Example

```html
<div id="container">
    <a href="javascript:" v-actions="{
        '刷新': function(){
            location.reload();
        },

        '搜索': function(){
            //do 
        }
    }">更多</a>
</div>

<script>
require.async(['vue', 'vmui/actions'], function(Vue, Actions){
    new Vue({
        el: '#container',
        directives: {
            Actions: Actions
        }
    });
});
</script>
```