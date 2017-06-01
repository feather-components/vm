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
            container.style.cssText = 'position: fixed; bottom: 0px; width: 100%; background: #ccc;';
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
        function install(Vue){
            if(install._installed) return;

            install._installed = true;
            Vue[directive ? 'directive' : 'component'](obj.name, obj);
        }

        if(window.Vue){
            install(window.Vue);
        }else{
            obj.install = install;
        }

        return obj;
    },

    factory(options, data = {}){
        var instance = new Vue(options);
        this.assign(instance, data);
        instance.$mount();
        document.body.appendChild(instance.$el);
        return instance;
    }
}

!Object.assign && (Object.assign = exports.default.assign);