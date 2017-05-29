var _ = require('./helper');

class Tabs{
    constructor(dom, options = {}){
        this.options = Object.assign({
            target(index){
                return _.$(this.getAttribute('data-target'));
            },
            selector: '*',
            currentClassName: '',
            current: 0
        }, options);

        this.dom = dom;
        this.initEvent();
        setTimeout(() => {
            this.to(this.options.current);
        }, 0);
    }

    initEvent(){
        _.on(this.dom, 'click', (e) => {
            this.to(e.target);
        });
    }

    to(index = 0){
        if(typeof index != 'number'){  
            index = this.index(index);
        }

        var self = this;

        if(index == -1 || index == self.$index){
            return;
        }

        self.$index = index;

        var elements = self.$(), element = elements[index];

        _.each(self.$(), (element, index) => {
            _.removeClass(element, self.options.currentClassName);
            self.hideTarget(index);
        });

        _.addClass(element);
        self.showTarget(index);
        _.trigger('switch', this.dom, {index, element});
    }

    target(index){
        return this.options.target.call(this.$()[index], index);
    }

    showTarget(index){
        var target = this.target(index);
        target && (target.style.display = 'block');
    }

    hideTarget(index){
        var target = this.target(index);
        target && (target.style.display = 'none');
    }

    index(element){
        return [].indexOf.call(this.$(), element);
    }

    $(){
        return _.$$(this.options.selector, this.dom);
    }
}

export default{
    bind(element, data){
        new Tabs(element, data.value);
    }
}