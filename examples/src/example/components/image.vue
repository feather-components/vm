<template>
    <vm-page>
        <vm-topbar>Image</vm-topbar>
        <br />
        <br />
        <vm-image style="margin:0 auto" :src="big" />
        <br />
        <br />
        <br />
        <br />
        <vm-image style="margin:0 auto" :src="url" />

    </vm-page>
</template>

<script>
export default {
    data () {
        return {
            url: '',
            big: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570365528983&di=7eaba7eb76b14a3db798b6a001a84431&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1305%2F16%2Fc4%2F20990657_1368686545119.jpg',
            src: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1570355352&di=8c7bc7a3e6ff52111e45766ab7cd212e&src=http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/e4dde71190ef76c6bd86a38b9916fdfaaf51673d.jpg'
        };
    },
    mounted () {
        setTimeout(() => {
            this.url = this.src;
        }, 1000);
    },
    methods: {

    }
};
</script>