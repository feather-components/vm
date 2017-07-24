import VueRouter from 'vue-router';
import Vue from 'vue';
require('../../rem.js');

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
import Grid from './components/grid.vue';
import Form from './components/form.vue';
import Filter from './components/filter.vue';
import Overlay from './components/overlay.vue';
import Slider from './components/slider.vue';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Main
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
            path: '/components/grid',
            component: Grid
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
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    data(){
        return {
            transitionName: 'fade'
        };
    },
    // watch $route 决定使用哪种过渡
    watch: {
        '$route'(to, from){
            this.transitionName = to.path.split('/').length < from.path.split('/').length ? 'slide-right' : 'slide-left';
        }
    }
});