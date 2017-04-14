actionsheet
================================

## Example

```html
<script>
require.async('vmui/actionsheet', function(ActionSheet){
    ActionSheet({
        '拨打电话 1234512345': function(){
            location.href = 'tel:1234512345'
        },

        'xxx': function(){}
    });
});
</script>
```