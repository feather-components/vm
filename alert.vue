<template>
<Alert>
    <template slot="content">{{content}}</template>
    <template slot="extras"></template>
</Alert>
</template>

<script>
import Vue from 'vue';

var Alert = module.exports = function(content, options, callback, manualClose){
    options = options || {};

    var element = document.createElement('div');
    element.innerHTML = Alert.template;

    var instance = new Vue({
        el: element,
        components: {
            Alert: require('./widgets/alert')
        },
        data: {
            content: content,
            buttons: options.buttons,
            extras: options.extras
        }
    });

    console.log(instance, instance.$el);

    document.body.appendChild(instance.$el);
    return instance;
};
</script>
