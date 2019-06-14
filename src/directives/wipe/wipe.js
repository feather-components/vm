import Draggable from '../draggable';
import {Dom, Event} from '../../helper';

const MIN_PERCENT = 0.3;

export default {
    bind (element, data) {
        let percent, callback;

        if (typeof data.value == 'function') {
            callback = data.value;
        } else {
            percent = data.value.percent;
            callback = data.value.callback;
        }

        let min;

        setTimeout(() => {
            min = Dom.width(element) * (percent || MIN_PERCENT);
        }, 100);

        const instance = new Draggable.Constructor(element, {
            axis: 'x',
            canDrag () {
                return false;
            }
        });

        let x;

        Event.on(element, 'drag:start', (e) => {
            x = e.data.clientX;
        });

        Event.on(element, 'drag:end', (e) => {
            let change = e.data.e.changedTouches[0].clientX - x;

            if (Math.abs(change) > min) {
                callback(change > 0 ? 1 : -1);
            }
        });
    },

    name: 'wipe'
};