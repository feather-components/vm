var css3s = ['transform', 'transition'];

import Util from './util';

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

    css(element, name, value){
        if(typeof name == 'object'){
            for(var key in name){
                this.css(element, key, name[key]);
            }
        }else{
            var css3name;

            if(this.css3(name)){
                css3name = Util.l2camel('-webkit-' + name);
            }

            name = Util.l2camel(name);

            if(typeof value == 'undefined'){
                return element.style[css3name || name] || window.getComputedStyle(element).getPropertyValue(css3name || name);
            }else{
                value += (typeof value == 'number' && !/^(?:opacity|zIndex)$/.test(name) ? 'px' : '');
                element.style[name] = value;

                if(css3name){
                    element.style[css3name] = value; 
                }
            }
        }
    },

    css3(name){
        return css3s.indexOf(name) > -1;
    },

    $(str, root = document){
        return typeof str == 'string' ? root.querySelector(str) : str;
    },

    $$(str, root = document){
        return (typeof str == 'string' ? root.querySelectorAll(str) : str) || [];
    },

    hasClass(element, className){  
        return element.className.match(new RegExp('(\\s+|^)' + className + '(\\s+|$)'));  
    },

    addClass(element, className){
        if(this.hasClass(element, className)){
            element.className += ' ' + className;
        }
    },

    removeClass(element, className){
        element.className = element.className.replace(new RegExp('(\\s+|^)' + className + '(\\s+|$)'));
    }
}