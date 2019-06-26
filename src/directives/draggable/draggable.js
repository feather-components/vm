import {Dom, Event, Util} from '../../helper';

class Draggable {
    constructor (element, options = {}) {
        this.dom = element;
        this.dom.$draggable = this;
        this.options = {
            axis: 'xy',
            stick: 1,
            ignores: null,
            canDrag () { return true; }
        };
        this.setOptions(options);
        this.initEvent();
    }

    setOptions (options = {}) {
        Object.assign(this.options, options);
    }

    isIgnoresTouch (target) {
        var ignores = this.options.ignores;

        if (!ignores) return false;

        switch (typeof ignores) {
            case 'function':
                return ignores(target);

            case 'string':
                return Dom.matches(target, ignores);

            default:
                return ignores.test(target.tagName);
        };
    }

    initEvent () {
        var options = this.options;
        var first;

        Event.on(this.dom, 'touchstart', (e) => {
            this.handler = e.target;
            first = true;

            if (this.isIgnoresTouch(this.handler)) return false;

            var {x, y} = this.translates = Dom.getTransform(this.dom);
            var {clientX, clientY} = e.touches[0];

            this.touch = {clientX, clientY};

            Event.trigger(this.dom, 'drag:start', {
                x, y, clientX, clientY, e
            });
        }, {
            passive: false
        });

        Event.on(this.dom, 'touchmove', (e) => {
            if (!this.touch) return false;

            e.preventDefault();

            var touch = e.touches[0];
            var {clientX, clientY} = this.touch;
            var axis = options.axis;
            var x = 0;
            var y = 0;
            var rx = (touch.clientX - clientX) / options.stick;
            var ry = (touch.clientY - clientY) / options.stick;

            if (/x/.test(axis)) {
                x = rx + this.translates.x;
            }

            if (/y/.test(axis)) {
                y = ry + this.translates.y;
            }

            var info = {
                x, y, clientX: touch.clientX, clientY: touch.clientY, e, rx, ry
            };

            this.touch = {
                clientX: touch.clientX,
                clientY: touch.clientY
            };

            if (first) {
                first = false;
                this.collectDragablesOnSameTree(info);

                if (this.isOtherAxisDraggable(info)) {
                    Event.trigger(this.dom, 'drag:other', info);
                    this.touch = null;
                    return false;
                }
            }

            this.isCanDrag = this.options.canDrag(info);

            if (!this.isCanDrag) {
                Event.trigger(this.dom, 'drag:reject', info);
                return false;
            }

            if (this.isOtherDraggable()) {
                Event.trigger(this.dom, 'drag:reject', info);
                return false;
            }

            this.translates = {x, y};

            Dom.css(this.dom, 'transform', `translate3d(${x}px, ${y}px, 0px)`);
            Event.trigger(this.dom, 'draging', info);
        }, {
            passive: false
        });

        Event.on(this.dom, 'touchend', (e) => {
            if (!this.touch) return false;

            this.touch = null;
            Event.trigger(this.dom, 'drag:end', {
                x: this.translates.x,
                y: this.translates.y,
                e
            });
        });
    }

    setStick (times = 1) {
        this.options.stick = times;
    }

    collectDragablesOnSameTree (info) {
        this.$draggables = [];

        var isX = Math.abs(info.rx) > Math.abs(info.ry);
        var handler = this.handler;

        do {
            let $draggable = handler.$draggable;

            if ($draggable && (isX && $draggable.options.axis == 'x' || !isX && $draggable.options.axis != 'x')) {
                this.$draggables.push($draggable);
            }

            handler = handler.parentNode;
        } while (handler);
    }

    isOtherAxisDraggable () {
        return this.$draggables.every(($draggable) => {
            return $draggable !== this;
        });
    }

    isOtherDraggable () {
        var $draggables = this.$draggables;
        var l = $draggables.length;

        for (let i = 0; i < l; i++) {
            let $draggable = this.$draggables[i];

            if ($draggable === this) {
                return false;
            }

            if ($draggable.isCanDrag) {
                return true;
            }
        }
    }
}

export default {
    bind (element, data) {
        // eslint-disable-next-line no-new
        new Draggable(element, data.value);
    },

    update (element, data) {
        element.$draggable.setOptions(data.value);
    },

    Constructor: Draggable,
    name: 'draggable'
};