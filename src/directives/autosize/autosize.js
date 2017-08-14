import {Event, Dom, Util} from '../../helper';

class AutoSize{
    constructor(element, instance){
        var self = this;

        if(element.style.height){
            self.height = element.style.height;
        }

        element.$autosize = self;
        self.element = element;
        self.instance = instance;
        self.initEvent();
        setTimeout(() => {
            self.resize();
        });
    }

    initEvent(){
        var self = this;

        Event.on(window, 'resize', () => {
            self.resize();
        });

        self.observer();
    }

    observer(){
        var self = this;

        if(self.mutationRoot) return;

        self.mutationRoot = Util.observer(self.instance.$root.$el, {
            attributes: true,
            subtree: true
        }, (mutations) => {
            var change = mutations.some((mutation) => {
                return mutation.attributeName == 'style' && Dom.contains(mutation.target, self.element);
            });

            if(change){
                self.resize();
            }
        });

        self.mutationSelf = Util.observer(self.element, {
            childList: true,
            subtree: true
        }, (mutations) => {
            self.resize();
        });
    }

    unobserver(){
        var self = this;

        if(self.mutationRoot){
            self.mutationRoot.disconnect();
            self.mutationRoot = null;
        }

        if(self.mutationSelf){
            self.mutationSelf.disconnect();
            self.mutationSelf = null;
        }
    }

    resize(){
        this.unobserver();
        clearTimeout(this.$tid);
        this.$tid = setTimeout(() => {
            this._resize();
            this.observer();
        }, 300);
    }

    _resize(){
        var self = this;        

        if(self.height || self.destroyed) return;

        var element = self.element;

        element.style.height = 'auto';

        var chains = [element];
        var maxHeight, parent = element, hasSetHeight = false;

        while(parent = parent.parentNode){
            chains.push(parent);

            if(parent === document.body){
                maxHeight = Dom.height(document.documentElement);
                break;
            }

            if(Dom.css(parent, 'max-height') != 'none'){
                hasSetHeight = true;
                maxHeight = Math.min(parseFloat(Dom.height(parent)), parseFloat(Dom.css(parent, 'max-height')));
                break;
            }

            if(parent.style.height){
                hasSetHeight = true;
                maxHeight = Dom.height(parent);
                break;
            }
        }

        maxHeight = parseFloat(maxHeight);

        var top = Dom.offset(element).top;

        if(!hasSetHeight || top + Dom.height(element.parentNode) > maxHeight){
            var otherHeight = 0;

            chains.pop();
            chains.forEach((ele) => {
                Dom.nexts(ele).forEach((next) => {
                    if(!/absolute|fixed/.test(Dom.css(next, 'position')) && next.offsetTop != ele.offsetTop){
                        otherHeight += Dom.height(next);
                    }
                });

                otherHeight += parseFloat(Dom.css(ele, 'margin-bottom') || 0);
            });
            
            element.style.overflow = 'hidden';
            element.style.height = maxHeight - (top - Dom.offset(parent).top) - otherHeight + 'px';
            Event.trigger(element, 'autosize');
        }else{
            element.style.overflow = '';
        }
    }

    destroy(){
        this.unobserver();
        this.destroyed = true;
    }
}

export default{
    bind(element, data, VNode){
        setTimeout(() => {
            new AutoSize(element, VNode.context);
        });
    },

    unbind(element){
        element.$autosize.destroy();
    },

    AutoSize,
    Constructor: AutoSize,
    name: 'autosize'
}