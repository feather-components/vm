import {Event, Dom, Util} from '../../helper';

class AutoSize {
    constructor (root) {
        this.$root = root;
        this.$root.$autosize = this;
        this.$listens = {};
        this.$mutation = null;
        setTimeout(() => {
            this.initEvent();
        }, 1000);
    }

    initEvent () {
        var self = this;

        Event.on(window, 'resize', () => {
            self.resizeAll(true);
        });
    }

    listen () {
        if (this.$mutation) return false;

        this.$mutation = Util.observer(this.$root, {
            childList: true,
            attributes: true,
            subtree: true
        }, (mutations) => {
            this.resizeAll();
        });
    }

    pause () {
        if (!this.$mutation) return false;
        this.$mutation.disconnect();
        this.$mutation = null;
    }

    observer (element) {
        if (element.style.height) return false;

        element.$autosize = this;

        this.$listens[element.$autosizeid = Date.now()] = {
            element: element,
            rect: {}
        };
        this.resize(element);
        this.listen();
    }

    unobserver (element) {
        delete this.$listens[element.$autosizeid];
        delete element.$autosize;
        delete element.$autosizeid;
    }

    resizeAll (force = false) {
        clearTimeout(this.$timer);
        this.$timer = setTimeout(() => {
            this.pause();
            for (let i in this.$listens) {
                this.resize(this.$listens[i].element, force);
            }
            this.listen();
        }, 300);
    }

    resize (element, force = false) {
        let newRect = Dom.rect(element);

        if (!newRect.width) {
            return false;
        }

        let info = this.$listens[element.$autosizeid];

        let oldRect = info.rect;

        if (newRect.top == info.rect.top && !force) {
            return false;
        }

        info.rect = newRect;

        element.style.height = 'auto';

        var chains = [element];
        var maxHeight; var parent = element; var hasSetHeight = false;

        while (parent = parent.parentNode) {
            chains.push(parent);

            if (parent === document.body) {
                maxHeight = Dom.height(document.documentElement);
                break;
            }

            if (Dom.css(parent, 'max-height') != 'none') {
                hasSetHeight = true;
                maxHeight = Math.min(parseFloat(Dom.height(parent)), parseFloat(Dom.css(parent, 'max-height')));
                break;
            }

            if (parent.style.height) {
                hasSetHeight = true;
                maxHeight = Dom.height(parent);
                break;
            }
        }

        maxHeight = parseFloat(maxHeight);

        var top = Dom.offset(element).top;

        if (!hasSetHeight || top + Dom.height(element.parentNode) > maxHeight) {
            var otherHeight = 0;

            chains.pop();
            chains.forEach((ele) => {
                Dom.nexts(ele).forEach((next) => {
                    if (!/absolute|fixed/.test(Dom.css(next, 'position')) && next.offsetTop != ele.offsetTop) {
                        otherHeight += Dom.height(next) + parseFloat(Dom.css(ele, 'margin-bottom') || 0);
                    }
                });

                otherHeight += parseFloat(Dom.css(ele, 'margin-bottom') || 0);
            });

            element.style.overflow = 'hidden';
            element.style.height = maxHeight - (top - Dom.offset(parent).top) - otherHeight + 'px';
            Event.trigger(element, 'autosize');
        } else {
            element.style.overflow = '';
        }
    }
}

export default {
    bind (element, data, VNode) {
        if (data.value && data.value.enable == false) {
            return false;
        }

        setTimeout(() => {
            let root = VNode.context.$root.$el;
            let instance = root.$autosize || new AutoSize(root);

            instance.observer(element);
        });
    },

    unbind (element) {
        element.$autosize && element.$autosize.unobserver(element);
    },

    resize (element) {
        setTimeout(() => {
            element = element.$el || element;
            element.$autosize.resize(element, true);
        }, 10);
    },

    Constructor: AutoSize,
    name: 'autosize'
};