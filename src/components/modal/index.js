import Modal from './modal';
import {Util} from '../../helper';

function create (message, options = {}) {
    options.message = message;

    let instance = Util.factory(Modal, options);
    instance.$on('hide', () => {
        instance.destroy();
        instance = null;
    });
    instance.show();

    return instance;
}

export default Util.register(Modal, false, (Vue) => {
    Vue.prototype.$alert = create;
    Vue.prototype.$confirm = (message, options = {}) => {
        return create(
            message,
            {
                'cancelButton': '取消',
                ...options
            }
        );
    };
});