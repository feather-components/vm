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

        Util.observer(self.element, {
            childList: true,
            subtree: true
        }, (mutations) => {
            self.resize();
        });
    }

    observer(){
        var self = this;

        self.mutation = Util.observer(self.instance.$root.$el, {
            attributes: true,
            subtree: true
        }, (mutations) => {
            var change = mutations.some((mutation) => {
                return mutation.attributeName == 'style' && Dom.contains(mutation.target, self.element, false);
            });
            
            if(change){
                self.unobserver();
                self.resize();
                setTimeout(() => {
                    self.observer();
                },0)
            }
        });
    }

    unobserver(){
        var self = this;

        if(self.mutation){
            self.mutation.disconnect();
            self.mutation = null;
        }
    }

    resize(){
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
            
            element.style.height = maxHeight - (top - Dom.offset(parent).top) - otherHeight + 'px';
            Event.trigger(element, 'autosize');
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