import Component from './toast';
import {Util} from '../../helper';

let instance;

function Toast (options, type) {
    Toast.destroy(false);

    let props = {
        duration: 1000,
        visible: true
    };

    if (typeof options == 'string') {
        props.message = options;
    } else {
        props = Object.assign(props, options);
    }

    type && (props.type = type);

    instance = Util.factory(Component, props);

    if (props.duration && props.duration > 0) {
        instance.$id = setTimeout(Toast.destroy, props.duration);
    }

    return instance;
}

Toast.destroy = (fx = true) => {
    if (instance) {
        instance.destroy(fx);
        instance.$id && clearTimeout(instance.$id);
        instance = null;
    }
};

['success', 'loading'].forEach((type) => {
    Toast[type] = (options) => {
        return Toast(options, type);
    };
});

Toast.Component = Component;
export default Util.register(Toast, false, (Vue) => {
    Vue.prototype.$toast = Toast;
});