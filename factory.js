import Vue from 'vue';
import _ from './helper';

export default (options, data = {}) => {
    var instance = new Vue(options);
    Object.assign(instance, data);
    instance.$mount();
    document.body.appendChild(instance.$el);
    return instance;
}