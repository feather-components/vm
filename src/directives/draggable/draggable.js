import {Dom, Event, Util} from '../../helper';

class Draggable{
    constructor(element, options = {}){
        var self = this;

        self.dom = element;
        self.dom.$draggable = self;
        self.options = Util.assign({
            axis: 'xy',
            stackTimes: 1,
            ignores: null,
            canDrag(){return true}
        }, options);

        self.stack(self.options.stackTimes);
        self.initEvent();
    }

    initEvent(){
        var self = this, options = self.options, justStart = false, target;

        Event.on(self.dom, 'touchstart', (e) => {
            target = e.target;

            justStart = true;

            if(target && options.ignores){
                if(typeof options.ignores == 'function'){
                    if(options.ignores.test(target)){
                        return false;
                    }
                }else if(typeof options.ignores == 'string'){
                    if(Dom.matches(target, options.ignores)){
                        return false;
                    }
                }else{
                    if(options.ignores.test(target.tagName)){
                        return false;
                    }
                } 
            }

            var {x, y} = self.translates = Draggable.getTransform(self.dom);
            var {pageX, pageY} = e.touches[0];

            self.touch = {pageX, pageY};

            Event.trigger(self.dom, 'drag:start', {
                x, y, pageX, pageY, e
            });
        });

        Event.on(document, 'touchmove', (e) => {
            if(!self.touch){
                return false;
            }

            e.preventDefault();

            var touch = e.touches[0];
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
                x, y, pageX: touch.pageX, pageY: touch.pageY, e, rx, ry
            };

            self.translates = {x, y};
            self.touch = {
                pageX: touch.pageX,
                pageY: touch.pageY
            };

            if(!options.canDrag.call(self, {x, y, rx, ry})){
                Event.trigger(self.dom, 'drag:reject', info);
                return false;
            }

            if(justStart){
                justStart = false;

                //if other draggable, end
                if(self.isOtherDraggable(target, {x: rx, y: ry})){
                    self.touch = null;
                    Event.trigger(self.dom, 'drag:other', info);
                    return false;
                }
            }

            Dom.css(self.dom, 'transform', `translate3d(${x}px, ${y}px, 0)`);
            Event.trigger(self.dom, 'draging', info);
        });

        Event.on(document, 'touchend', (e) => {
            if(!self.touch){
                return false;
            }

            self.touch = null;

            var {x, y} = Draggable.getTransform(self.dom);

            Event.trigger(self.dom, 'drag:end', {
                x, y, e
            });
        });
    }

    stack(times = 1){
        this.options.stackTimes = times;
    }

    isOtherDraggable(target, info){
        var $draggable, self = this;
        var isX = Math.abs(info.x) > Math.abs(info.y);

        do{
            if(target.$draggable){
                $draggable = target.$draggable;

                if(isX && $draggable.options.axis == 'x' || !isX && $draggable.options.axis != 'x'){
                    break;
                }
            }
        }while(target = target.parentNode);

        return $draggable !== self;
    }
}

Draggable.getTransform = (element) => {
    var matrix = Dom.css(element, 'transform'), x = 0, y = 0;

    if(matrix && matrix != 'none'){
        if(matrix[0] != '['){
            matrix.replace(/translate(3d|X|Y|)\((.+)\)/g, function(all, type, value){
                if(type == 'X'){
                    x = parseFloat(value);
                }else if(type == 'Y'){
                    y = parseFloat(value);
                }else{
                    value = value.split(/\s*,\s*/);
                    x = parseFloat(value[0]);
                    y = parseFloat(value[1]);
                }
            });
        }else{
            matrix = matrix.split(')')[0].split(', ');
            x = +(matrix[12] || matrix[4]);
            y = +(matrix[13] || matrix[5]);
        }
    }

    return { x: x, y: y };
};

export default{
    bind(element, data){
        new Draggable(element, data.value);
    },

    Draggable,
    Constructor: Draggable,
    name: 'draggable'
};
