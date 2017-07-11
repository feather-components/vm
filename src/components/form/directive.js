import {Dom} from '../../helper';
require('./common.css');

export const Counter = {
    name: 'counter',

    bind(element, data, VNode){
        var limit = data.value.limit;
        var ml = Dom.$('.vm-form-box-msg', element);
        var instance = VNode.componentInstance;

        instance.$on('input', msg);  

        function msg(v){
            ml.innerHTML = `<span class="${v.length > limit ? 'vm-form-error' : ''}">${v.length}</span>/${limit}`;
        }

        msg(instance.val || '');
    }
};