import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import Main from './main.vue';
import Alert from './components/alert.vue';
import Toast from './components/toast.vue';
import Scroll from './components/scroll.vue';
import List from './components/list.vue';
import Button from './components/button.vue';
import ActionSheet from './components/actionsheet.vue';
import Dropdown from './components/dropdown.vue';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Main
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
            this.transitionName = to.path == '/' ? 'slide-right' : 'slide-left';
        }
    }
});