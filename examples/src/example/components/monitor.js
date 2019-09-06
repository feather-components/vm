

class fsMonitor {
    START = fsMonitor.connectStart();
    stores = [];

    constructor (element, options) {
        this.element = element;
        this.options = options;
        this.$ = fsMonitor.observer(this.element, this.try2collect.bind(this));
        setTimeout(this.analyse.bind(this), 2500);
    }   

    try2collect (records) {
        records.forEach((record) => {
            for (let node of record.addedNodes) {
                node.tagName && this.collect(node);
            }

            this.try2collectImage(record.target);
        });
    }

    try2collectImage (node) {
        if (node._$$monitor) return false;

        node._$$monitor = true;
        setTimeout(() => {
            this.collectImage(node);
            node._$$monitor = false;
        }, 50);
    }

    collectImage (node) {
        [].forEach.call(node.getElementsByTagName('img'), (image) => {
            if (image._$$monitor) return;

            image._$$monitor = true;

            let info = this.collect(node);
            info.image = true;

            if (image.complete) return;

            info.promise = new Promise((resolve) => {
                fsMonitor.on(image, 'load complete error', () => {
                    info.time = Date.now();
                    resolve();
                });
            });
        });
    }

    collect (node) {
        let info = {
            el: node,
            time: Date.now()
        };
        this.stores.push(info);
        return info;
    }

    _ () {
        const R_TOP = this.element.getBoundingClientRect().top;
        const HALF_MAX_WIDTH = window.innerWidth;
        let all = [];

        this.stores.forEach((info) => {
            let {height, top, width, left} = info.el.getBoundingClientRect();

            info.height = height;
            info.top = top - R_TOP;

            if (info.image) {
                if (width > HALF_MAX_WIDTH && left > HALF_MAX_WIDTH) {
                    return;
                } else if (info.promise) {
                    all.push(new Promise((resolve) => {
                        info.promise.then(() => {
                            info.height = info.el.height;
                            resolve(info);
                        })
                    }));
                    return;
                }
            }

            all.push(info);
        });

        return all;
    }

    analyse () {
        this.$.disconnect();

        Promise.all(this._()).then((res) => {
            let spaces = [], last = 0;

            res.sort((a, b) => {
                return a.top - b.top;
            }).reduceRight((a, b) => {
                const aBottom = a.top + a.height;

                if (b.top > window.innerHeight || a.top < 0) return b;

                if (b.top - aBottom > 50) {
                    spaces.push([aBottom, b.top]);
                }

                last = Math.max(last, a.time, b.time);

                return b.top + b.height > aBottom ? b : a;
            });

            console.log(spaces, last - this.START);
        });
    }

    static connectStart () {
        let match = location.href.match(/timestamp=(\d+)/);

        if (match) {
            return match[1];
        }

        return performance.timing.connectStart;
    }

    static observer (target, callback) {
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        const observer = new MutationObserver(callback);
        observer.observe(target, {
            childList: true,
            subtree: true
        });
        return observer;
    }

    static on (element, event, callback) {
        event.split(' ').forEach((e) => {
            element.addEventListener(e, callback);
        });
    }
}

export default {
    bind (element, data) {
        new fsMonitor(element);
    }
};