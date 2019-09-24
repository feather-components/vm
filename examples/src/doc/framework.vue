<template>
    <div class="container">
        <div class="navs">
            <div class="inner">
                <template v-for="(nav, key) of navs">
                    <a
                        v-if="!nav.subs"
                        :key="key"
                        :href="'#' + nav.url"
                        :class="{
                            selected: nav.url == url
                        }"
                        @click="go2v(nav)"
                    >
                        {{nav.title}}
                        <span class="description" v-if="nav.description">{{nav.description}}</span>
                    </a>

                    <div v-else :key="key" class="l">
                        <div class="s">{{nav.title}}</div>
                        <a
                            v-for="(sub, i) of nav.subs"
                            :key="i"
                            :href="'#' + sub.url"
                            :class="{
                                selected: sub.url == url
                            }"
                            @click="go2v(sub)"
                        >
                            {{sub.title}}
                            <span class="description" v-if="sub.description">{{sub.description}}</span>
                        </a>
                    </div>
                </template>
            </div>
        </div>

        <div class="async markdown-body">
            <router-view />
        </div>

        <div class="example">
            <div class="example-inner">
                <iframe :src="'./example.html#/' + demo"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
import navs from './navs';

export default {
    data () {
        return {
            navs,
            url: '',
            demo: ''
        };
    },

    mounted () {
        setTimeout(() => {
            this.url = this.$route.path;
            this.demo = this.getdemo(this.url);
        }, 100);
    },

    methods: {
        getdemo (url = '') {
            const f = (list) => {
                list.forEach(item => {
                    if (item.url === url) {
                        url = item.demo;
                        return url;
                    }
                    if (item.subs) {
                        f(item.subs);
                    }
                });
                return url;
            };

            return f(navs) || '';
        },
        go2v (info) {
            this.url = info.url;
            this.demo = info.demo || '';
        }
    }
};
</script>

<style scoped lang="less">
.container {
    display: flex;
    height: 100%;
    overflow: hidden;
}

.navs {
    height: 100%;
    width: 250px;
    font-size: 14px;
    overflow-y: auto;
    .inner {
        margin: 30px 0px;
        border-right: 1px solid #eee;
    }

    a {
        display: block;
        text-decoration: none;
        color: #333;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border-left: 3px solid #fff;
    }

    a:hover, .selected {
        border-left: 3px solid #E74D4D;
        background: rgba(231, 77, 77, 0.3);
    }

    .l {
        padding-left: 15px;
        margin-top: 10px;
    }

    .s {
        line-height: 50px;
        height: 40px;
        font-size: 16px;
        font-family: bold;
        color: #E74D4D;
    }

    .description {
        font-size: 12px;
        color: #999;
        margin-left: 10px;
    }
}

.async {
    height: 100%;
    flex: 1;
    overflow: auto;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 20px;
}

.example {
    display: flex;
    height: 100%;
    align-items: center;
}

.example-inner {
    transform: scale(0.8);
    background: url(./phone.png);
    background-size: 100%;
    padding: 97px 12px;
}

iframe {
    background: #fff;
    border: 0px;
    width: 375px;
    height: 667px;
}
</style>