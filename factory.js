import Vue from 'vue';

export default (options) => {
    var instance = new Vue(options);
    var element = document.createElement('div');
    document.body.appendChild(element);
    return instance.$mount(element);
}