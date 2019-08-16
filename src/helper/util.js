export default {
    pad (str) {
        return str < 10 ? `0${str}` : str;
    },

    date (str) {
        let date = typeof str == 'string' ? new Date(str.replace(/-/g, '/')) : str;

        if (isNaN(date.getTime())) {
            throw new Error(`${date} is not a valid date type!`);
        }

        return date;
    },

    n2p (number) {
        if (/^\d+$/.test(number)) {
            return number + 'px';
        }

        return number;
    },

    l2camel (str) {
        return str.replace(/-(\w)/g, (all, c, index) => index > 0 ? c.toUpperCase() : c);
    },

    each (arr, callback) {
        if (arr.length) {
            [].forEach.call(arr, callback);
        } else {
            for (var i in arr) {
                callback(arr[i], i);
            }
        }
    },

    rfa (callback) {
        return (window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 1000 / 60); })(callback);
    },

    crfa (id) {
        return id && (
            window.cancelRequestAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.clearTimeout
        )(id);
    },

    makeArray (arr) {
        if (Array.isArray(arr)) {
            return arr;
        }

        return arr == null ? [] : [arr];
    },

    log () {
        var str = JSON.stringify(arguments);
        var container = document.querySelector('#__log__');

        if (!container) {
            container = document.createElement('div');
            container.id = '__log__';
            container.style.cssText = 'position: fixed; bottom: 0px; width: 100%; background: #ccc; z-index: 10000; overflow: hidden; max-height: 200px;';
            document.body.appendChild(container);
        }

        container.innerHTML = container.innerHTML + '<br />' + str;
        setTimeout(() => {
            container.scrollTop = 100000000;
        }, 0);
    },

    firstKey (obj) {
        for (var i in obj) {
            return i;
        }

        return false;
    },

    observer (target, config = {}, callback) {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var observer = new MutationObserver(callback);

        observer.observe(target, config);
        return observer;
    },

    register (obj, directive = false, after) {
        var Component = directive ? obj : (obj.Component || obj);

        function install (Vue) {
            if (install._installed) return;

            install._installed = true;

            if (directive) {
                Vue.directive(Component.name, obj);
            } else {
                Component._$name = Component.name;
                delete Component.name;
                Vue.component(`vm-${Component._$name}`, Component);
            }

            after && after(Vue);
        }

        if (window.Vue) {
            install(window.Vue);
        } else {
            obj.install = Component.install = install;
        }

        return obj;
    },

    factory (options, data = {}, container = document.body) {
        var klass = this.$$.extend(options);
        var instance = new klass({
            propsData: data
        });

        instance.$mount();
        container.appendChild(instance.$el);
        return instance;
    },

    debounce (fn, wait) {
        let id;

        return function (...args) {
            id && clearTimeout(id);
            id = setTimeout(() => {
                fn.apply(this, args);
            }, wait);
        };
    },

    ajax (url, params) {
        let xhr = new XMLHttpRequest();
        let promise = new Promise((resolve, reject) => {
            xhr.open('GET', url + '?_random=' + Math.random(), true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    xhr.status == 200 ? resolve(JSON.parse(xhr.responseText)) : reject();
                }
            };
            xhr.send(params);
        });

        promise.abort = xhr.abort;
        return promise;
    },

    acm (ajax, context, index = 0) {
        const name = '$$ajax-' + index;
        const idn = name + '-id';

        if (context[name] && context[name].abort) {
            context[name].abort();
        }

        let id = context[idn] = Date.now();
        
        context[name] = ajax;

        if (!ajax.then) {
            throw new Error('api return must be a promise~');
        }

        return new Promise((resolve, reject) => {
            ajax.then((data) => {
                id == context[idn] && resolve(data);
            }, (data) => {
                id == context[idn] && reject(data);
            });
        });
    }
};