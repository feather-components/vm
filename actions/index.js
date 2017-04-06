import Factory from '../factory';
import Actions from './actions';

export default{
    bind(element, data){
        var o = data.value;

        if(!o.actions){
            o = {actions: data.value};
        }

        o.handler = element;

        Factory(Actions, o);
    }
}