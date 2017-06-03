import Component from './popover';
import {Util} from '../../helper';

var Popover = {
    bind(element, data){
        var o = data.value;

        if(!o.actions){
            o = {actions: data.value};
        }

        o.dom = element;
        Util.factory(Component, o);
    },

    name: 'popover'
}

export default Util.register(Popover, true);