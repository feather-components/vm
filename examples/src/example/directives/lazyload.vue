<template>
    <vm-page>
        <vm-topbar slot="header">lazyload</vm-topbar>
        <vm-scroll v-lazyload v-monitor>
            <div ref="container">
                <div class="item" v-for="item of number">
                    <vm-image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1849159362,540367789&fm=27&gp=0.jpg" />
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
                    // Helper.Util.observer(element, {
                    //         childList: true,
                    //         subtree: true
                    //     }, (...args) => {
                    //         console.log(args);
                    //     });

                    // setTimeout(() => {
                    //     let maxWidth = window.innerWidth, maxHeight = window.innerHeight;
                    //     let start = performance.timing.responseStart;
                    //     let images = element.querySelectorAll('img');
                    //     let promises = [].map.call(images, (image, index) => {
                    //         console.log(image.width, image.height);
                    //         return new Promise((resolve) => {
                    //             if (image.complete) {
                    //                 resolve(image);
                    //             } else {
                    //                 image.addEventListener('load', resolve);
                    //                 image.addEventListener('complete', resolve);
                    //                 image.addEventListener('error', resolve);
                    //             }
                    //         });
                    //     });

                    //     Promise.all(promises).then(() => {
                    //         console.log('duration, ', Date.now() - start);
                    //     });

                    //     Helper.Util.observer(element, {
                    //         childList: true,
                    //         subtree: true
                    //     }, Helper.Util.debounce((...args) => {
                    //         console.log(args);
                    //     }, 50));
                    // }, 0);

                }
            }
        },

        data () {
            return {
                number: 20
            };
        },

        mounted () {
            setTimeout(() => {
                this.number = 10;
                // setTimeout(() => {
                //     this.number = 102;
                // }, 10)
            }, 1000);
        }
    }
</script>