import {Event, Dom, Util} from '../../helper';

class AutoSize{
    constructor(element, options = {}){
        var self = this;

        if(element.style.height){
            self.height = element.style.height;
        }

        element.$autosize = self;
        self.element = element;
        self.instance = options.instance;
        self.initEvent();
        setTimeout(() => {
            self.resize();
        });
    }

    initEvent(){
        Event.on(window, 'resize', () => {
            this.resize();
        });

        this.observer();
    }

    observer(){
        var self = this;

        self.mutation = Util.observer(self.instance.$root.$el, {
            attributes: true,
            subtree: true
        }, (mutations) => {

            var change = mutations.some((mutation) => {
                return mutation.attributeName == 'style' && Dom.contains(mutation.target, self.element);
            });

            if(change){
                self.unobserver();
                self.resize();
                self.observer();
            }
        });

        Util.observer(self.element, {
            childList: true,
            subtree: true
        }, () => {
            self.resize();
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
        //return;

        var element = self.element;

        element.style.height = 'auto';

        var top = element.offsetTop;
        var maxHeight, parent = element;

        while(parent = parent.parentNode){
            if(parent === document.body){
                maxHeight = Dom.height(document.documentElement);
                break;
            }

            if(Dom.css(parent, 'max-height') != 'none'){
                maxHeight = Dom.css(parent, 'max-height');
                break;
            }

            if(parent.style.height){
                maxHeight = Dom.height(parent);
                break;
            }
        }

        maxHeight = parseFloat(maxHeight);



        if(top + Dom.height(element) > maxHeight){
            var otherHeight = 0;

            Dom.siblings(element).forEach((child) => {
                if(child.offsetTop != top){
                    otherHeight += Dom.height(child);
                }
            });

            element.style.height = maxHeight - otherHeight - parseFloat(Dom.css(element, 'margin-bottom') || 0) + 'px';
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
            new AutoSize(element, {
                instance: VNode.context
            });
        });
    },

    unbind(element){
        element.$autosize.destroy();
    },

    AutoSize,
    name: 'autosize'
}