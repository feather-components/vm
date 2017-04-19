datepicker
================================

## Example

```html
  <datepicker   @cancel="closeDatepicker" :init-year="2016"
                :init-month="2" :init-day="29"></datepicker>
                
  <button v-datepicker @datepicker:change="showDate">12333</button>
                
```