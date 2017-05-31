import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import Main from './main.vue';
import Alert from './components/alert.vue';

const router = new VueRouter({
    routes: [
        {path: '', component: Main},
        {path: '/components/alert', component: Alert},
        {path: '/bar', component: {template: '<div>456</div>'}}
    ]
})

new Vue({
    el: '#app',
    router: router
});