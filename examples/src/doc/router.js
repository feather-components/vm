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
            path: '/pages/layout/page',
            component: (resolve) => require(['./pages/layout/page.md'], resolve)
        },

        {
            path: '/pages/layout/topbar',
            component: (resolve) => require(['./pages/layout/topbar.md'], resolve)
        },

        {
            path: '/pages/layout/box~row',
            component: (resolve) => require(['./pages/layout/box~row.md'], resolve)
        },

        {
            path: '/pages/layout/list',
            component: (resolve) => require(['./pages/layout/list.md'], resolve)
        },

        {
            path: '/pages/layout/toast',
            component: (resolve) => require(['./pages/layout/toast.md'], resolve)
        },

        {
            path: '/pages/layout/modal',
            component: (resolve) => require(['./pages/layout/modal.md'], resolve)
        },

        {
            path: '/pages/layout/scroll',
            component: (resolve) => require(['./pages/layout/scroll.md'], resolve)
        },

        {
            path: '/pages/layout/actionsheet',
            component: (resolve) => require(['./pages/layout/actionsheet.md'], resolve)
        },

        {
            path: '/pages/layout/tabs',
            component: (resolve) => require(['./pages/layout/tabs.md'], resolve)
        },

        {
            path: '/pages/layout/swiper',
            component: (resolve) => require(['./pages/layout/swiper.md'], resolve)
        },

        {
            path: '/pages/layout/segment',
            component: (resolve) => require(['./pages/layout/segment.md'], resolve)
        },

        {
            path: '/pages/layout/popup',
            component: (resolve) => require(['./pages/layout/popup.md'], resolve)
        },

        {
            path: '/pages/layout/popover',
            component: (resolve) => require(['./pages/layout/popover.md'], resolve)
        },

        {
            path: '/pages/layout/badge',
            component: (resolve) => require(['./pages/layout/badge.md'], resolve)
        },

        {
            path: '/pages/layout/dropdown',
            component: (resolve) => require(['./pages/layout/dropdown.md'], resolve)
        },

        {
            path: '/pages/layout/filter',
            component: (resolve) => require(['./pages/layout/filter.md'], resolve)
        },

        {
            path: '/pages/forms/form',
            component: (resolve) => require(['./pages/forms/form.md'], resolve)
        },

        {
            path: '/pages/forms/input',
            component: (resolve) => require(['./pages/forms/input.md'], resolve)
        },

        {
            path: '/pages/forms/textarea',
            component: (resolve) => require(['./pages/forms/textarea.md'], resolve)
        },

        {
            path: '/pages/forms/switch',
            component: (resolve) => require(['./pages/forms/switch.md'], resolve)
        },

        {
            path: '/pages/forms/checker',
            component: (resolve) => require(['./pages/forms/checker.md'], resolve)
        },

        {
            path: '/pages/layout/picker',
            component: (resolve) => require(['./pages/layout/picker.md'], resolve)
        },

        {
            path: '/pages/layout/datepicker',
            component: (resolve) => require(['./pages/layout/datepicker.md'], resolve)
        },

        {
            path: '/pages/layout/search',
            component: (resolve) => require(['./pages/layout/search.md'], resolve)
        },

        {
            path: '/pages/layout/searchbar',
            component: (resolve) => require(['./pages/layout/searchbar.md'], resolve)
        },

        {
            path: '/pages/layout/image',
            component: (resolve) => require(['./pages/layout/image.md'], resolve)
        },

        {
            path: '/pages/layout/loading',
            component: (resolve) => require(['./pages/layout/loading.md'], resolve)
        },

        {
            path: '/pages/layout/forward',
            component: (resolve) => require(['./pages/layout/forward.md'], resolve)
        }

    ]
});