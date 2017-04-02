import Factory from '../factory';
import Actions from './actions';

export default{
    bind(element, data){
        var o = data.value;

        if(!o.actions){
            o = {actions: data.value};
        }

        o.element = element;

        var instance = Factory(Actions, o);
        element.addEventListener('touchstart', (e) => {
            instance.open();
            e.stopPropagation();
        }, false);
    }
}