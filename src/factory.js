import Vue from 'vue';
import _ from './helper';

export default (options, data = {}) => {
    console.log(options)
    var instance = new Vue(options);
    console.log(data);
    Object.assign(instance, data);
    instance.$mount();
    document.body.appendChild(instance.$el);
    return instance;
}