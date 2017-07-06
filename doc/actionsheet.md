ActionSheet
================================

## Example

```js
import {ActionSheet} from 'vm';

ActionSheet({
    '拨打电话 1234512345': function(){
        location.href = 'tel:1234512345'
    },

    'xxx': function(){}
});
```