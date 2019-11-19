import Vue from 'vue';
import Ajax from 'ajax';
import Framework from './framework';
import router from './router';

new Vue({
    el: '#app',
    components: {
        Framework
    },
    router: router
});