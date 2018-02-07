import {Dom, Event, Util} from '../../helper';
import Lightbox from '../../components/lightbox';

function getItems(element, selector, attr = 'src'){
    return getImgs(element, selector).map((el, index) => {
        return el.getAttribute(attr);
    });
}

function getImgs(element, selector = 'img'){
    return [].slice.call(Dom.$$(selector, element));
}

export default{
    bind(element, {value = {}}){
        let $lightbox, items = getItems(element, value.selector, value.srcAttr);
        $lightbox = element.$lightbox = Util.factory(Lightbox, {items: items, visible: false});
        $lightbox.__selector = value.selector;
        $lightbox.__srcAttr = value.srcAttr;

        Event.on(element, 'click', (e) => {
            let el = e.target;
            let index = getImgs(element, value.selector, value.srcAttr).indexOf(el);

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
            element.$lightbox.updateItems(getItems(element, element.$lightbox.__selector, element.$lightbox.__srcAttr));
        }, 0);
    },

    Component: Lightbox,
    name: 'lightbox'
};
