import {Dom} from '../../helper';
require('./form.css');

export const Counter = {
    name: 'counter',

    bind(element, data, VNode){
        var limit = data.value.limit;
        var ml = Dom.$('.vmui-form-box-ml', element);
        var instance = VNode.componentInstance;

        instance.$on('input', msg);  

        function msg(v){
            ml.innerHTML = `<span class="${v.length > limit ? 'vmui-form-error' : ''}">${v.length}</span>/${limit}`;
        }

        msg(instance.val || '');
    }
};