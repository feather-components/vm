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
        self.fill = options.fill;
        self.resize();
        self.initEvent();
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
        var parent = element.parentNode;
        var height, otherHeight = 0, selfTop = Dom.offset(element).top;

        element.style.height = 'auto';

        if(parent.style.height){
            height = Dom.height(parent);
        }else{
            height = Dom.height(document.documentElement) - Dom.offset(parent).top;
        }

        if(Dom.css(parent, 'max-height')){
            height = Math.min(height, parseFloat(parent.style.maxHeight));
        }

        if(!this.fill){
            height = Math.min(Dom.height(element), height);
        }else{
            Dom.siblings(element).forEach((child) => Dom.offset(child).top != selfTop && (otherHeight += Dom.height(child)));
            height -= otherHeight;
        }

        element.style.height = height - parseInt(Dom.css(element, 'margin-bottom') || 0) + 'px';
        Event.trigger(element, 'autosize');
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
                fill: data.value.fill,
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