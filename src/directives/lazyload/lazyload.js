import {Dom, Event, Util} from '../../helper';

class Lazyload{
    constructor(element, options){
        this.options = Util.assign({
            srcAttr: 'data-src',
            placeholder: ''
        }, options);
        this.element = element;

        if(this.options.placeholder){
            this.placeholderClassName = 'vm-lazyload-' + Date.now();
            var el = Dom.create(`<style type="text/css">
                .${this.placeholderClassName}{
                    background: url(${this.options.placeholder}) center center no-repeat;
                }
                </style>
            `);
            document.getElementsByTagName('head')[0].appendChild(el);
        }

        this.load();
    }

    observer(){
        var self = this;

        self.mutation = Util.observer(self.element, {
            attributes: true,
            subtree: true
        }, (mutations) => {
            if(mutations[0].target == 'img') return;
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
        clearTimeout(this.$tid);
        this.$tid = setTimeout(() => {
            this._load();
        }, 200);
    }

    _load(){
        var self = this;

        if(!Dom.height(self.element)){
            self.observer();
            return;
        }

        var {srcAttr, placeholder} = self.options;
        var images = Dom.$$(`img[${srcAttr}]`, self.element);
        var maxTop = Dom.height(document), maxLeft = Dom.width(document);
       
        self.unobserver();

        for(var i = 0; i < images.length; i++){
            var node = images[i];
            var rect = Dom.rect(node);

            if(rect.top > maxTop || rect.left > maxLeft){
                break;
            }else if(rect.bottom < 0 || rect.right < 0){
                continue;
            }else{
                ((node) => {
                    if(self.placeholderClassName){
                        Dom.addClass(node, self.placeholderClassName);
                    }

                    node.src = node.getAttribute(srcAttr);

                    self.placeholderClassName && (node.onload = () => {
                        Dom.removeClass(node, self.placeholderClassName); 
                    });
                    node.removeAttribute(srcAttr);
                })(node);
            }
        }

        self.observer();
    }
}

export default{
    bind(element, data){
        setTimeout(() => {
            new Lazyload(element, data.value);
        }, 0);
    },

    Lazyload,
    Constructor: Lazyload,
    name: 'lazyload'
};
