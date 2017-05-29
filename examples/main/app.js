import Vue from 'vue';
import {Shade} from 'vmui';

var app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

new Vue({
    components: {
        Shade
    },

    template: '<shade :visible="true" />'
}).$mount('#app');