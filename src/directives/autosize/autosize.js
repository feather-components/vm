import {Event, Dom, Util} from '../../helper';

class AutoSize{
    constructor(element, fill = true){
        if(element.style.height){
            this.height = element.style.height;
        }

        element.$autosize = this;
        this.element = element;
        this.fill = fill;
        this.resize();
        this.initEvent();
    }

    initEvent(){
        Event.on(window, 'resize', () => {
            this.resize();
        });
    }

    resize(){
        var self = this;
        console.log(133);
        if(self.height) return;

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
}


Util.observer(document.body, {
    attributes: true,
    subtree: true
}, (mutations) => {
    var mutation = mutations[0];
    
    mutations.forEach((mutation) => {
        if(mutation.attributeName == 'style' && mutation.target.$autosize){
            mutation.target.$autosize.resize();
        }
    });
});

export default{
    bind(element, data){
        setTimeout(() => {
            new AutoSize(element, data.value.fill);
        });
    }
}