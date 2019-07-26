<template>
    <vm-page>
        <vm-topbar slot="header">lazyload</vm-topbar>
        <vm-scroll v-lazyload v-monitor>
            <div ref="container">
                <div class="item" v-for="item of number">
                    <img data-src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1849159362,540367789&fm=27&gp=0.jpg" />
                </div>
            </div>
        </vm-scroll>
    </vm-page>
</template>

<style scoped>
    img{
        display: block;
        width: 100%;
        height: 100px;
    }

    item {
        width: 100%;
        height: 100px;
    }

    item img {
        height: 100%;
        width: 100%;
    }
</style>

<script>
    import {Helper} from 'vm';

    export default {
        directives: {
            monitor: {
                bind (element, data) {
                    setTimeout(() => {
                        let maxWidth = window.innerWidth, maxHeight = window.innerHeight;
                        let start = performance.timing.responseStart;
                        let images = element.querySelectorAll('img');
                        let promises = [].map.call(images, (image, index) => {
                            console.log(image.width, image.height);
                            return new Promise((resolve) => {
                                image.addEventListener('load', resolve);
                                image.addEventListener('complete', resolve);
                                image.addEventListener('error', resolve);
                            });
                        });

                        console.log(maxWidth, maxHeight);

                        Promise.all(promises).then(() => {
                            console.log('duration, ', Date.now() - start);
                        });

                        Helper.Util.observer(element, {
                            childList: true,
                            subtree: true
                        }, (...args) => {
                            console.log(args);
                        });
                    }, 0);
                }
            }
        },

        data () {
            return {
                number: 6
            };
        },

        mounted () {
            this.$nextTick(() => {
                this.number = 100;
            });
        }
    }
</script>