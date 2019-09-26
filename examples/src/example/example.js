import VueRouter from 'vue-router';
import AppTransition from 'app-transition';
import Vue from 'vue';

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
import Popup from './components/popup.vue';
import Slider from './components/slider.vue';
import Tabs from './components/tabs.vue';
import Layout from './components/layout.vue';
import Forward from './components/forward.vue';
import VmBadge from './components/badge.vue';
import Badge from './directives/badge.vue';
import Draggable from './directives/draggable.vue';
import Lazyload from './directives/lazyload.vue';
import Segment from './components/segment.vue';
import Topbar from './components/topbar.vue';
import Page from './components/page.vue';
import Input from './components/input.vue';
import Textarea from './components/textarea.vue';
import Switch from './components/switch.vue';
import Picker from './components/picker.vue';
import DatePicker from './components/datepicker.vue';
import Configs from './cfg.js';

import VM from 'vm';
import Ajax from 'ajax';

require('fastclick').attach(document.body);

Vue.use(AppTransition);
Vue.use(VueRouter);

VM.install(Vue, {
    'topbar.border-bottom': '1px solid #eee',
    'requestHelper': (url, params) => {

    }
});

// Vue.use(VM, Configs);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Main
        },

        {
            path: '/components/page',
            component: Page
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
            path: '/components/badge',
            component: VmBadge
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
            path: '/components/popup',
            component: Popup
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
            path: '/components/tabs',
            component: Tabs
        },

        {
            path: '/components/topbar',
            component: Topbar
        },

        {
            path: '/components/input',
            component: Input
        },

        {
            path: '/components/textarea',
            component: Textarea
        },

        {
            path: '/components/switch',
            component: Switch
        },

        {
            path: '/components/picker',
            component: Picker
        },

        {
            path: '/components/datepicker',
            component: DatePicker
        }
    ]
});

new Vue({
    el: '#app',
    router: router
});