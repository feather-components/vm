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

            _.css(self.dom, 'transform', `translate3d(${x}px, ${y}px, 0)`);
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
    var matrix = _.css(element, 'transform'), x = 0, y = 0;

    if(matrix != 'none'){
        matrix = matrix.split(')')[0].split(', ');
        x = +(matrix[12] || matrix[4]);
        y = +(matrix[13] || matrix[5]);
    }

    return { x: x, y: y };
};

module.exports = {
    bind(element, data){
        new Draggable(element, data.value);
    }
};

module.exports.Draggable = Draggable;