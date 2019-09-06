import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: (resolve) => require(['./pages/main.md'], resolve)
        },

        {
            path: '/pages/use',
            component: (resolve) => require(['./pages/use.md'], resolve)
        },

        {
            path: '/pages/config',
            component: (resolve) => require(['./pages/config.md'], resolve)
        },

        {
            path: '/pages/base/button',
            component: (resolve) => require(['./pages/base/button.md'], resolve)
        },

        {
            path: '/pages/layout/box~row',
            component: (resolve) => require(['./pages/layout/box~row.md'], resolve)
        }
    ]
});