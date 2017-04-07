export default{
    offset(element){
        var top = 0, left = 0;

        do{
            top += element.offsetTop;
            left += element.offsetLeft;
        }while(element = element.offsetParent);

        return {
            left,
            top
        }
    },

    siblings(element){
        return [].filter.call(element.parentNode.children, (child) => child !== element);
    },

    height(element){
        return this.isDoc(element) ? document.documentElement.clientHeight : element.offsetHeight;
    },

    width(element){
        return this.isDoc(element) ? document.documentElement.clientWidth : element.offsetWidth;
    },

    size(element){
        return {width: this.width(element), height: this.height(element)};
    },

    rect(element){
        return element.getBoundingClientRect();
    },

    isDoc(element){
        return element === document.documentElement || element === document;
    },

    contains(root, el){
        return root === el || !!(root.compareDocumentPosition(el) & 16); 
    },

    on(element, event, callback){
        element.addEventListener(event, callback);
    },

    off(element, event, callback){
        element.removeEventListener(event, callback);
    },

    trigger(element, event){
        var evt = document.createEvent('HTMLEvents');  
        evt.initEvent(event, true, true);  
        return !element.dispatchEvent(evt); 
    },

    l2camel(str){
        return str.replace(/-(\w)/g, (all, c) => c.toUpperCase());
    },

    css(element, name, value){
        if(typeof name == 'object'){
            for(var key in name){
                this.css(element, key, name[key]);
            }
        }else{
            name = this.l2camel(name);

            if(typeof value == 'undefined'){
                return element.style[name];
            }else{
                element.style[name] = value + (typeof value == 'number' && !/^(?:opacity|zIndex)$/.test(name) ? 'px' : '');
            }
        }
    },

    assign(obj){
        [].slice.call(arguments, 1).forEach((args) => {
            for(var i in args){
                obj[i] = args[i];
            }
        })

        return obj
    },

    $: (str) => {
        return typeof str == 'string' ? document.querySelector(str) : str;
    }
}

!Object.assign && (Object.assign = exports.default.assign);