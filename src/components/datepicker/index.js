import Factory from '../factory';
import datepicker from './datepicker';
import _ from '../helper';
export default{
    bind(el, data){
        var instance = Factory(datepicker, data.value);

        instance.$on('select',(a,b,c)=>{
            _.trigger(el, 'datepicker:change',[a,b,c]);
        });
        instance.$on('cancel', ()=>{
            _.trigger(el, 'datepicker:close');
        });
        el.addEventListener('touchstart', (e) => {
            instance.createDatepicker();
            e.stopPropagation();
        }, false);
    }
}