Modal
==============
弹框


## Slots

* header
* default

```html
<modal>
    i'm modal
</modal>
```

* footer

```html
<modal :visible="visible">
    i'm modal
    <template slot="footer">
        <a href="javascript" @click="">abc</a>
        <a href="javascript" @click="visible = false"></a>
    </template>
</modal>   
```