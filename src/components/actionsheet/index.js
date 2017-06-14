import Component from './actionsheet';
import {Util} from '../../helper';

var instance;
var ActionSheet = (actions) => {
    instance && instance.destroy();
    return instance = Util.factory(Component, {
        actions
    });
};

ActionSheet.component = Util.register(Component);
export default ActionSheet;