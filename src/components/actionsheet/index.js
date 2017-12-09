import Component from './actionsheet';
import {Util} from '../../helper';

var instance;
var ActionSheet = (actions) => {
    instance && instance.destroy();
    instance = Util.factory(Component, {
        actions,
        visible: true
    });
    instance.$on('close', () => {
        instance.destroy();
    });

    return instance;
};

ActionSheet.Component = Component;
export default Util.register(ActionSheet);