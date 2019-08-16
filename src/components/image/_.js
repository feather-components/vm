import {Util} from '../../helper';

let _;

export default {
    on (instance) {
        if (!_) {
            _ = {};
            
            Util.observer(instance.$root.$el, {
                childList: true,
                attributes: true,
                subtree: true
            }, Util.debounce(() => {
                for (let i in _) {
                    _[i].try2load();
                }
            }, 1000));
        }

        if (!instance._$id) {
            instance._$id = Math.random();
        }

        _[instance._$id] = instance;
    },

    off (instance) {
        delete _[instance._$id];
    }
};