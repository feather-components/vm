import VueRouter from 'vue-router';
import AppTransition from 'app-transition';
import Vue from 'vue';
require('../../rem.js');

Vue.use(AppTransition);
Vue.use(VueRouter);

import Main from './main.vue';
import Alert from './components/alert.vue';
import Toast from './components/toast.vue';
import Scroll from './components/scroll.vue';
import List from './components/list.vue';
import Button from './components/button.vue';
import ActionSheet from './components/actionsheet.vue';
import Dropdown from './components/dropdown.vue';
import Searchbar from './components/searchbar.vue';
import Search from './components/search.vue';
import Uploader from './components/uploader.vue';
import Popover from './components/popover.vue';
import Form from './components/form.vue';
import Filter from './components/filter.vue';
import Overlay from './components/overlay.vue';
import Slider from './components/slider.vue';
import Tabbar from './components/tabbar.vue';
import Layout from './components/layout.vue';
import Forward from './components/forward.vue';
import Badge from './directives/badge.vue';
import Draggable from './directives/draggable.vue';
import Lazyload from './directives/lazyload.vue';
import Segment from './components/segment.vue';

import {Topbar} from 'vm';
import VM from 'vm';

Vue.use(VM);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Main
        },

        {
            path: '/components/layout',
            component: Layout
        },

        {
            path: '/components/segment',
            component: Segment
        },

        {
            path: '/directives/lazyload',
            component: Lazyload
        },

        {
            path: '/components/forward',
            component: Forward
        },

        {
            path: '/directives/badge',
            component: Badge
        },

        {
            path: '/directives/draggable',
            component: Draggable
        },

        {
            path: '/components/uploader',
            component: Uploader
        },

        {
            path: '/components/overlay',
            component: Overlay
        },

        {
            path: '/components/filter',
            component: Filter
        },


        {
            path: '/components/form',
            component: Form
        },

        {
            path: '/components/popover',
            component: Popover
        },

        {
            path: '/components/search',
            component: Search
        },

        {
            path: '/components/searchbar',
            component: Searchbar
        },

        {
            path: '/components/button',
            component: Button
        },

        {
            path: '/components/dropdown',
            component: Dropdown
        },

        {
            path: '/components/actionsheet',
            component: ActionSheet
        },

        {
            path: '/components/alert',
            component: Alert
        }, 

        {
            path: '/components/toast',
            component: Toast
        },

        {
            path: '/components/scroll',
            component: Scroll
        },

        {
            path: '/components/list',
            component: List
        },

        {
            path: '/components/slider',
            component: Slider
        },

        {
            path: '/components/tabbar',
            component: Tabbar
        }
    ]
});

new Vue({
    el: '#app',
    router: router
});