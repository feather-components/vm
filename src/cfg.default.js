import Util from './helper/util';

export default {
    'theme': '#E74D4D',
    'requestHelper' (url, params) {
        return Promise.resolve([]);
    },
    // components
    'page.background': '#fff',
    'topbar.padding-top': '0px',
    'topbar.border-bottom': '0px',
    'topbar.background': '#fff',
    'topbar.color': '#000',
    'topbar.font-size': '18px',
    'button.radius': '100px',
    'button.sizes': ['46px', '36px', '23px'], // large|normal|small
    'button.colors': {
        primary: ''
    },
    'segment.color': '#fff',
    'segment.high-color': '',
    'loading.color': '',
    'tabs.high-color': '',
    'loading.color': '',
    'tick.color': '#009933',
    'scroll.ignores': null,
    'scroll.use-transform': false,
    'list.label.page': 'page',
    'list.label.persize': 'size'
};