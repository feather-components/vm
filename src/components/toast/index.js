import Component from './toast';
import {Util} from '../../helper';

var instance = null, timeid;

var Toast = (content, time = 3000, mask, className = '') => {
    Toast.destroy();

    if(time){
        timeid = setTimeout(Toast.destroy, time);
    }

    return instance = Util.factory(Component, {
        content: content,
        mask: mask,
        iconClass: className
    });
};

Toast.destroy = () => {
    if(timeid){
        clearTimeout(timeid);
        timeid = null;
    }

    if(instance){
        instance.destroy();
        instance = null;
    }
};

['success', 'loading'].forEach((method) => {
    Toast[method] = (content, time, mask) => {
        Toast(content, time, mask, 'vmui-toast-' + method);
    };
});

Toast.component = Util.register(Component);
export default Toast;