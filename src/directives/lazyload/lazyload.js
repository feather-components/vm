import {Dom, Event, Util} from '../../helper';

class Lazyload{
    constructor(element, options){
        this.options = Util.assign({
            srcAttr: 'data-src',
            placeholder: ''
        }, options);
        this.element = element;

        this.load();
    }

    observer(){
        var self = this;

        self.mutation = Util.observer(self.element, {
            attributes: true,
            subtree: true
        }, (mutations) => {
            self.load();
        });
    }

    unobserver(){
        var self = this;

        if(self.mutation){
            self.mutation.disconnect();
            self.mutation = null;
        }
    }

    load(){
        var self = this, {srcAttr, placeholder} = self.options;
        var images = Dom.$$(`img[${srcAttr}]`, self.element);
        var maxTop = Dom.height(document), maxLeft = Dom.width(document);

        self.unobserver();

        for(var node of images){
            var rect = Dom.rect(node);

            if(rect.top > maxTop || rect.left > maxLeft){
                break;
            }else{
                ((node) => {
                    if(placeholder){
                        node.style.background = `url(${placeholder}) no-repeat center center`;
                    }
                    
                    node.src = node.getAttribute(srcAttr);
                    node.onload = () => {
                        node.style.background = 'none';
                    };
                    node.removeAttribute(srcAttr);
                })(node);
            }
        }

        self.observer();
    }
}

export default{
    bind(element, data){
        new Lazyload(element, data.value);
    },

    Lazyload,
    Constructor: Lazyload,
    name: 'lazyload'
};
