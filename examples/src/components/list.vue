<template>
    <vm-page>
        <vm-topbar slot="header">list组件</vm-topbar>
            <vm-list
                :api="api"
                :max-count-per-page="10"
                :data-formatter="formatter"
                :pullup2load="true"
                :pulldown2refresh="true"
                v-monitor="{
                    range: [0.1, 0.7],
                    bb: '.a'
                }"
            >
                <header slot="header">网易实时新闻</header>
                <template v-slot:row="{data, index}">
                    <div class="row">
                        <a class="inner" href="javascript:">
                            <vm-swipeout>
                                <div :class="{
                                content: true,
                                active: active
                                }" >
                                    <template v-if="!data.title">
                                    <vm-image class="ads" src="http://cms-bucket.nosdn.127.net/96d8cf0375f64c24a819d50ae190b51820170601175516.jpeg?imageView&thumbnail=690y230&quality=45&type=webp&interlace=1&enlarge=1" />
                                    </template>
                                    <template v-else>
                                        <vm-image v-if="data.picInfo[0]" :src="data.picInfo[0].url"  />
                                        <span class="title">{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}{{data.digest}}</span>
                                    </template>
                                </div>

                                <template slot="actions">
                                    <vm-swipeout-action style="width: 100px; background: blue;" @click="onDel">删除</vm-swipeout-action>
                                    <vm-swipeout-action @click="onComment">评论</vm-swipeout-action>
                                </template>
                            </vm-swipeout>
                        </a>
                    </div>
                </template>
            </vm-list>
    </vm-page>
</template>

<style scoped>
    .row img {
        width: 100%;
    }

    .row{
        padding: 0px 10px;
    }

    .inner{
        min-height: 70px;
        display: block;
        text-decoration: none;
        color: #000;
        position: relative;
    }

    .content{
        background: #fff;
        padding: 10px 0px;
        border-bottom: 1px solid #ccc;
    }

    .active{
        transition: transform .3s ease;
    }

    .comment{
        position: absolute;
        height: 100%;
        width: 100px;
        background: red;
        color: #fff;
        display: block;
        right: 1px;
        top: 1px;
        z-index: -1;
        text-align: center;
    }

    .content:after{
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden
    }

    .title{
        font-size: 14px;
    }

    img{
        width: 90px;
        height: 70px;
        display: block;
        float: left;
        margin-right: 10px;
    }

    .ads{
        width: 100%;
        float: none;
        height: 115px;
    }

    header{
        padding: 5px;
        text-align: center;
    }
</style>

<script>
import Ajax from 'ajax';
import {Helper} from 'vm';

export default {
    data () {
        return {
            active: false
        };
    },

    directives: { 
        monitor: {
            bind (element, data) {
                let stores = [];

                const START = performance.timing.connectStart;

                function collectImage (target) {
                    [].map.call(target.getElementsByTagName('img'), (image) => {
                        if (image._$$monitor) {
                            return false;
                        }

                        image._$$monitor = true;

                        let info = {
                            el: image
                        };

                        info.promise = new Promise((resolve) => {
                            if (image.complete) {
                                resolve();
                            } else {
                                image.addEventListener('load', resolve);
                                image.addEventListener('complete', resolve);
                                image.addEventListener('error', resolve);
                            }
                        });
                        
                        info.promise.then(() => {
                            info.time = Date.now();
                        });

                        stores.push(info);
                    });

                    target._$$monitor = false;
                }

                function collect (target) {
                    stores.push({
                        el: target,
                        time: Date.now()
                    });
                }

                const ob = Helper.Util.observer(element, {
                    childList: true,
                    subtree: true
                }, (records) => {
                    const time = Date.now();
                    
                    [].map.call(records, (record) => {
                        let nodes = record.addedNodes;

                        if (nodes.length) {
                            [].map.call(nodes, (node) => {
                                node.tagName && collect(node);
                            });
                        }

                        if (record.target._$$monitor) {
                            return false;
                        }

                        record.target._$$monitor = true;
                        setTimeout(() => {
                            collectImage(record.target);
                            record.target._$$monitor = false;
                        }, 50);
                    });
                });

                function analyse () {
                    ob.disconnect();
                    const rect = Helper.Dom.rect(element);
                    const WIDTH = window.innerWidth, HEIGHT = Math.min(window.innerHeight, rect.height);
                    const RELATIVE = rect.top;
                    let count = 0;
                    let arr = [];
                    let image;

                    for (let i = 0; i < stores.length; i++) {
                        let info = stores[i];
                        let rect = Helper.Dom.rect(info.el);

                        info.rect = {
                            height: rect.height,
                            top: rect.top - RELATIVE
                        };

                        if (info.image) {
                            if (rect.width > (WIDTH / 2) && rect.left > (WIDTH / 2)) {
                                continue;
                            } else {
                                arr.push(new Promise((resolve) => {
                                    info.then(() => {
                                        info.rect.height = info.el.height;
                                        resolve(info);
                                    });
                                }));
                            }
                        } else {
                            arr.push(info);
                        }
                    }

                    Promise.all(arr).then((res) => {
                        let spaces = [];
                        let last = 0;

                        res.sort((a, b) => {
                            return a.rect.top - b.rect.top;
                        }).reduce((a, b) => {
                            let aTop = a.rect.top;
                            let aBottom = aTop + a.rect.height;
                            let bTop = b.rect.top;

                            if (bTop > HEIGHT || aTop < 0) {
                                return b;
                            }

                            if (bTop - aBottom > 50) {
                                spaces.push([
                                    aBottom,
                                    bTop
                                ]);
                            }
                            
                            last = Math.max(last, a.time, b.time);

                            if (bTop + b.rect.height > aBottom) {
                                return b;
                            } else {
                                return a;
                            }
                        });

                        console.log(spaces, last - performance.timing.connectStart);
                    });
                }

                setTimeout(analyse, 2500);
            }
        }
    },

    methods: {
        api (params) {
            return new Promise((resolve, reject) => {
                Ajax({
                    url: 'https://3g.163.com/touch/jsonp/sy/recommend/10-10.html?hasad=1&miss=59&refresh=A&offset=0&size=10&callback=?',
                    dataType: 'json',
                    success (data) {
                        resolve(data.list);
                    },
                    error: reject
                });
            });
        },

        formatter (data) {
            return data.list;
        },

        canDrag (info) {
            return info.x > -100 && info.x <= 0;
        },

        dragStart () {
            this.active = false;
        },

        dragEnd (event) {
            var info = event.data;
            this.active = true;
            setTimeout(() => {
                info.e.target.style.transform = `translate3d(${info.x < -50 ? -100 : 0}px, 0px, 0px)`;
            }, 100);
            
        },

        onDel () {
            console.log('del');
        },

        onComment () {
            console.log('comment')
        }
    }
};
</script>