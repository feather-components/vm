import Component from './alert';
import {Util} from '../../helper';

var override = (callback) => {
    return (...args) => {
        if(typeof args[1] != 'object'){
            args.splice(1, 0, {});
        }else if(!args[1]){
            args[1] = '';
        }

        return callback.apply(window, args);
    }
};

var Alert = override((content, options, callback, manualClose) => {
    return Util.factory(Component, {
        content: content,
        extras: options.extras,
        buttons: options.buttons || {
            '确定': {
                className: 'vmui-alert-sbtn',
                callback: function(){
                    callback && callback();
                    !manualClose && this.destroy(false);
                }
            }
        }
    });
});

Alert.confirm = override((content, options, callback, manualClose) => {
    return Util.factory(Component, {
        content: content,
        extras: options.extras,
        buttons: options.buttons || {
            '取消': {
                props: {
                    border: true
                },
                
                callback: function(){
                    this.destroy(false);
                }
            },

            '确定': {
                callback: function(){
                    callback && callback();
                    !manualClose && this.destroy(false);
                }
            }
        }
    });
});

Alert.component = Util.register(Component);
export default Alert;