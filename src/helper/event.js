export default {
    on (element, event, callback, options) {
        event.split(' ').forEach((event) => {
            element.addEventListener(event, callback, options);
        });
    },

    off (element, event, callback) {
        element.removeEventListener(event, callback);
    },

    trigger (element, event, data = [], bubbles = false) {
        var evt = document.createEvent('HTMLEvents');

        evt.initEvent(event, bubbles, true);
        evt.data = data;
        return !element.dispatchEvent(evt);
    }
};