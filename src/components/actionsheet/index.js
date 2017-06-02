import ActionSheet from './actionsheet';
import {Util} from '../../helper';

var instance;

export default (actions) => {
    instance && instance.destroy();
    instance = Util.factory(ActionSheet, {
        actions
    });
}