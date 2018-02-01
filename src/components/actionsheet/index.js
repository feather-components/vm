import Component from './actionsheet';
import {Util} from '../../helper';

var instance;
var ActionSheet = (actions, cancelDisabled) => {
    instance && instance.destroy();
    instance = Util.factory(Component, {
        actions,
        cancelDisabled,
        visible: true
    });
    instance.$on('close', () => {
        instance.destroy();
    });

    return instance;
};

ActionSheet.Component = Component;
export default Util.register(ActionSheet);