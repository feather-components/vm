import {Dom, Event, Util} from '../../helper';
import Lightbox from '../../components/lightbox';

function getItems(element, selector){
    return getImgs(element, selector).map((el, index) => {
        return el.src;
    });
}

function getImgs(element, selector = 'img'){
    return [].slice.call(Dom.$$(selector, element));
}

export default{
    bind(element, {value = {}}){
        let $lightbox, items = getItems(element, value.selector);
        $lightbox = element.$lightbox = Util.factory(Lightbox, {items: items, visible: false});
        $lightbox.__selector = value.selector;

        Event.on(element, 'click', (e) => {
            let el = e.target;
            let index = getImgs(element, value.selector).indexOf(el);

            if(index > -1){
                $lightbox.open();

                setTimeout(() => {
                    $lightbox.to(index, false)
                }, 0);
            }
        });
    },

    update(element){
        setTimeout(() => {
            element.$lightbox.updateItems(getItems(element, element.$lightbox.__selector));
        }, 0);
    },

    Component: Lightbox,
    name: 'lightbox'
};
