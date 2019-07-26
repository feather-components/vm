<template>
    <masker :visible="visibility">
        <overlay :visible="visibility" class="vm-iosselect" position="bottom">
            <div class="vm-iosselect-header">
                <a href="javascript:" @click="close">取消</a>
                <div class="vm-iosselect-title">{{title}}</div>
                <a href="javascript:" class="vm-iosselect-confirm" :style="{color: theme}" @click="confirm">确定</a>
            </div>

            <div class="vm-iosselect-inner">
                <scroll 
                    class="vm-iosselect-scroll" 
                    v-for="(list, index) in renderLists" 
                    :key="index"
                    ref="scrolls"
                    @hook:mounted="listen(index)"
                >
                    <div class="vm-iosselect-list">
                        <a 
                            href="javascript:"
                            v-for="(item, key) of list"
                            :key="key"
                            @click="select(item, key, index)"
                            :style="vals[index] && item.value === vals[index].value ? activedStyle : {}"
                        >
                            {{item.label}}
                        </a>
                    </div>
                </scroll>
            </div>
        </overlay>
    </masker>
</template>

<script>
import Scroll from '../scroll';
import Overlay from '../overlay';
import Masker from '../masker';
import {Util, Dom} from '../../helper';
import Config from '../../config';

const HEIGHT = 35;

export default {
    name: 'iosselect',

    mixins: [Overlay],

    props: {
        title: {
            type: String,
            default: ''
        },

        cancelText: {
            type: String,
            default: '取消'
        },

        confirmText: {
            type: String,
            default: '确定'
        },

        source: {
            type: Array,
            default () {
                return [];
            }
        },

        value: {
            type: Array,
            default () {
                return [];
            }
        }
    },

    components: {
        Scroll,
        Overlay,
        Masker
    },

    data () {
        const color = Config('theme');

        return {
            theme: color,
            allData: [],
            renderLists: [],
            vals: [],
            val: this.value,
            activedStyle: {
                opacity: 1,
                color
            }
        };
    },

    watch: {
        val (v) {
            this.$emit('input', v);
        },

        value (v) {
            this.setValue(v);
        },

        source (v) {
            this.render(v);
        }
    },

    mounted () {
        this.source.length > 0 && this.render();
    },

    methods: {
        render (source = this.source) {
            source = Util.makeArray(source);

            if (!Array.isArray(source[0])) {
                source = [source];
            }

            let promises = source.map((data, key) => {
                if (typeof data == 'function') {
                    return Util.acm(data(), this, key);
                } else {
                    return data;
                }
            });

            Promise.all(promises).then((data) => {
                this.$emit('data:ready', data);

                let i = 0, render = 0;

                for (let i = 0; i < data.length; i++) {
                    if (this.allData[i] != data[i]) {
                        render = i;
                        break;
                    }
                }

                this.allData = data;
                this.renderColumns(this.allData[render], render);
            });
        },

        renderColumns (data, level) {
            this.renderLists.splice(level, 1, data);

            if (!data.length) return false;

            let select = [data[0], 0, level];

            for (let i = 0; i < data.length; i++) {
                if (data[i].value == this.val[level]) {
                    select = [data[i], i, level];
                    break;
                }
            }

            setTimeout(() => this.select(...select), 10);
        },

        select (data, index, level, duration) {
            let $scroll = this.$refs.scrolls[level];

            $scroll.scrollTo(-HEIGHT * index, duration || 400);
            this.vals.splice(level, 100000, data);

            if (data.children) {
                this.renderColumns(data.children, level + 1);
            } else if (level < this.allData.length - 1) {
                this.renderColumns(this.allData[level + 1], level + 1);
            }
            
            this.$emit('select', this.vals);
        },

        listen (level) {
            let $scroll = this.$refs.scrolls[level];

            $scroll.$on('drag:end', (pos, target = pos, duration = 0) => {
                let list = this.renderLists[level];
                let index = Math.min(list.length - 1, Math.round(Math.abs(target)) / HEIGHT);

                this.select(list[index], index, level, duration);
            });

            level === this.allData.length - 1 && setTimeout(() => this.$emit('scroll:ready'), 20);
        },

        confirm () {
            this.val = this.vals.map((item) => {
                return item.value;
            });

            this.$emit('confirm', this.val, this.vals);
            this.close();
        },

        setValue (v) {
            v = Util.makeArray(v);

            if (v.toString() === this.val.toString()) {
                return false;
            }

            this.render();
            this.val = v;
        }
    }
};
</script>

<style lang="less">
.vm-iosselect.vm-overlay {
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 10001;
    background: #f5f5f5;
}

.vm-iosselect-header {
    display: flex;
    height: 44px;
    background: #fff;
    font-size: 14px;
    justify-content: space-between;

    .vm-iosselect-title {
        font-weight: bold;
        height: 44px;
        line-height: 44px;
    }

    a {
        display: inline-block;
        height: 44px;
        text-decoration: none;
        line-height: 44px;
        width: 50px;
        color: #ddd;
        text-align: center;
        font-size: 14px;
    }

    .vm-iosselect-confirm {
        color: #7792cb;
    }
}

.vm-iosselect-inner {
    width: 100%;
    height: 175px;
    display: flex;
}

.vm-iosselect-scroll {
    flex-grow: 1;
    height: 100%;
}

.vm-iosselect-list {
    padding: 70px 0px;

    a {
        color: #333;
        display: block;
        height: 35px;
        line-height: 35px;
        text-align: center;
        text-decoration: none;
        opacity: 0.3;
        font-size: 13px;
    }
}
</style>