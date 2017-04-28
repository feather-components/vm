import _ from './helper';

class Draggable{
    constructor(element, options = {}){
        this.dom = element;
        this.options = Object.assign({
            axis: 'xy',
            stackTimes: 1,
            canDrag(){return true}
        }, options);

        this.stack(this.options.stackTimes);
        this.initEvent();
    }

    initEvent(){
        var self = this, options = self.options;

        _.on(self.dom, 'touchstart', (event) => {
            var {x, y} = self.translates = Draggable.getTransform(self.dom);
            self.touch = event.touches[0];

            _.trigger(self.dom, 'drag:start', {
                x, y, event
            });
        });

        _.on(document, 'touchmove', (event) => {
            if(!self.touch){
                return false;
            }

            event.preventDefault();

            var touch = event.touches[0];
            var {pageX, pageY} = self.touch;
            var axis = options.axis;
            var x = 0, y = 0;
            var rx = (touch.pageX - pageX)/options.stackTimes, ry = (touch.pageY - pageY)/options.stackTimes;

            if(/x/.test(axis)){
                x = rx + self.translates.x;
            }

            if(/y/.test(axis)){
                y = ry + self.translates.y;
            }

            var info = {
                x, y, event
            };

            self.translates = {x, y};
            self.touch = touch;

            if(!options.canDrag.call(self, {x, y, rx, ry})){
                _.trigger(self.dom, 'drag:reject', info);
                return false;
            }

            _.css(self.dom, '-webkit-transform', `translate3d(${x}px, ${y}px, 0)`);
            _.trigger(self.dom, 'draging', info);
        });

        _.on(document, 'touchend', (event) => {
            if(!self.touch){
                return false;
            }

            self.touch = null;

            var {x, y} = Draggable.getTransform(self.dom);

            _.trigger(self.dom, 'drag:end', {
                x, y, event
            });
        });
    }

    stack(times = 1){
        this.options.stackTimes = times;
    }
}

Draggable.getTransform = (element) => {
    var translate = element.style.webkitTransform || '';
    var matches = translate.match(/-?\d+(?:\.\d+)?(?=px)/g) || [];
    var x = 0, y = 0;

    if(/translate3d/.test(translate)){
        x = matches[0];
        y = matches[1];
    }else if(/translateX/.test(translate)){
        x = matches[0];
    }else if(/translateY/.test(translate)){
        y = matches[0];
    }

    return {x: Number(x), y: Number(y)};
};

module.exports = {
    bind(element, data){
        new Draggable(element, data.value);
    }
};

module.exports.Draggable = Draggable;