import Alert from './components/alert';
import Vue from 'vue';

var app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

new Vue({
    template: `<alert label="123333" />`,
    components: {Alert}
}).$mount('#app');

