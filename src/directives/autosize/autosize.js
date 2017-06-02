import {Event, Dom, Util} from '../../helper';

class AutoSize{
    constructor(element, options = {}){
        if(element.style.height){
            this.height = element.style.height;
        }

        element.$autosize = this;
        this.element = element;
        this.instance = options.instance;
        this.fill = options.fill;
        this.resize();
        this.initEvent();
    }

    initEvent(){
        Event.on(window, 'resize', () => {
            this.resize();
        });
        this.observer();
    }

    observer(){
        this.mutation = Util.observer(this.instance.$root.$el, {
            attributes: true,
            subtree: true
        }, (mutations) => {
            var change = mutations.some((mutation) => {
                return mutation.attributeName == 'style' && Dom.contains(mutation.target, this.element);
            });

            if(change){
                this.unobserver();
                this.resize();
                this.observer();
            }
        });
    }

    unobserver(){
        if(this.mutation){
            this.mutation.disconnect();
            this.mutation = null;
        }
    }

    resize(){
        var self = this;

        if(self.height || self.destroyed) return;

        var element = this.element;
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