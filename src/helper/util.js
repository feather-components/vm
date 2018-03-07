import Vue from 'vue';

export default{
    l2camel(str){
        return str.replace(/-(\w)/g, (all, c, index) => index > 0 ? c.toUpperCase() : c);
    },

    assign(obj){
        [].slice.call(arguments, 1).forEach((args) => {
            for(var i in args){
                obj[i] = args[i];
            }
        })

        return obj;
    },

    each(arr, callback){
        if(arr.length){
            [].forEach.call(arr, callback);
        }else{
            for(var i in arr){
                callback(arr[i], i);
            }
        }
    },

    rfa(callback){
        return (window.requestAnimationFrame     ||
            window.webkitRequestAnimationFrame  ||
            function (callback) { window.setTimeout(callback, 1000 / 60); })(callback);
    },

    crfa(id){
        return id && (
            window.cancelRequestAnimationFrame ||
            window.webkitCancelAnimationFrame  ||
            window.clearTimeout
        )(id);
    },

    makeArray(arr){
        if(Array.isArray(arr)){
            return arr;
        }

        return arr == null ? [] : [arr];
    },

    log(){
        var str = JSON.stringify(arguments);
        var container = document.querySelector('#__log__');

        if(!container){
            container = document.createElement('div');
            container.id = '__log__';
            container.style.cssText = 'position: fixed; bottom: 0px; width: 100%; background: #ccc; z-index: 10000;';
            document.body.appendChild(container);
        }

        container.innerHTML = container.innerHTML + '<br />' + str;
    },

    firstKey(obj){
        for(var i in obj){
            return i;
        }

        return false;
    },

    observer(target, config = {}, callback){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        var observer = new MutationObserver(callback);

        observer.observe(target, config);
        return observer;
    },

    register(obj, directive = false){
        var Component = directive ? obj : (obj.Component || obj);
        
        function install(Vue){
            if(install._installed) return;

            install._installed = true;

            if(directive){
                Vue.directive(Component.name, obj);
            }else{
                Vue.component(Component.name = `vm-${Component.name}`, obj);
            }
        }

        if(window.Vue){
            install(window.Vue);
        }else{
            obj.install = Component.install = install;
        }

        return obj;
    },

    factory(options, data = {}, container = document.body){
        var instance = new Vue(options, data);
        Object.assign(instance, data);
        instance.$mount();
        container.appendChild(instance.$el);
        return instance;
    },

    defineConfig(obj, _default = {}){
        obj._config = _default;
        obj.config = (name, value) => {
            if(typeof name == 'object'){
                this.assign(obj._config, name);
            }else if(value == void 0){
                return obj._config[name];
            }else{
                obj._config[name] = value;
            }
        }
    }
}

!Object.assign && (Object.assign = exports.default.assign);