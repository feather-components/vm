import Component from './toast';
import {Util} from '../../helper';

var instance = null; var timeid;

var Toast = (content, time = 3000, mask, className = '') => {
    Toast.destroy(false);

    instance = Util.factory(Component, {
        content: content,
        mask: mask,
        iconClass: className
    });

    if (time) {
        timeid = setTimeout(Toast.destroy, time);
    }

    return instance;
};

Toast.destroy = (fx = true) => {
    if (timeid) {
        clearTimeout(timeid);
        timeid = null;
    }

    if (instance) {
        instance.destroy(fx);
        instance = null;
    }
};

['success', 'loading'].forEach((method) => {
    Toast[method] = (content, time, mask) => {
        return Toast(content, time, mask, 'vm-toast-' + method);
    };
});

Toast.Component = Component;
export default Util.register(Toast);