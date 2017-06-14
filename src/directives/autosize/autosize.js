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

        element.style.height = 'auto';

        var parentHeight;
        var parentMaxHeight = Dom.css(parent, 'max-height');

        if(parent.style.height){
            parentHeight = Dom.height(parent);
        }else{
            parentHeight = Dom.height(document.documentElement) - Dom.offset(parent).top;
        }

        var otherHeight = 0, selfTop = Dom.offset(element).top;

        Dom.siblings(element).forEach((child) => {
            if(Dom.offset(child).top != selfTop){
                otherHeight += Dom.height(child);
            }
        });

        otherHeight += parseFloat(Dom.css(element, 'margin-bottom') || 0);

        var height = Dom.height(element);

        if(parentMaxHeight != 'none'){
            parentHeight = Math.min(parentHeight, parseFloat(parentMaxHeight));
            height = Math.min(parentHeight - otherHeight, height);
        }else{
            height = parentHeight - otherHeight;
        }

        element.style.height = height + 'px';
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