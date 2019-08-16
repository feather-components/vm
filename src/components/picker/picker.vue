<template>
    <popup :visible="visibility" position="bottom">
        <div class="vm-picker-header">
            <a href="javascript:" @click="hide">
                {{cancelText}}
            </a>

            <div class="vm-picker-title">{{title}}</div>
            
            <a 
                href="javascript:" 
                class="vm-picker-confirm" 
                :style="{color: theme}" 
                @click="onConfirm"
            >
                {{confirmText}}
            </a>
        </div>

        <div class="vm-picker-inner">
            <scroll 
                class="vm-picker-colum" 
                style="height: 100%;"
                v-for="(list, index) in renderLists" 
                :key="index"
                ref="scrolls"
                @hook:mounted="listen(index)"
            >
                <div class="vm-picker-column-inner">
                    <a 
                        href="javascript:"
                        v-for="(item, key) of list"
                        :key="key"
                        @click="select(item, key, index)"
                        :style="isActived(item, index) ? activedStyle : ''"
                    >
                        {{item.label}}
                    </a>
                </div>
            </scroll>
        </div>
    </popup>
</template>

<script>
import Scroll from '../scroll';
import Popup from '../popup';
import {Util, Dom} from '../../helper';
import Config from '../../config';
import Model from '../../mixins/model';

const HEIGHT = 35;

export default {
    name: 'picker',

    mixins: [Popup, Model],

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

        options: {
            type: Array,
            default () {
                return [];
            }
        }
    },

    components: {
        Scroll,
        Popup
    },

    data () {
        const color = Config('theme');

        return {
            theme: color,
            allData: [],
            renderLists: [],
            vals: [],
            val: Util.makeArray(this.value),
            activedStyle: {
                opacity: 1,
                color
            }
        };
    },

    watch: {
        options (options) {
            this.render(options);
        }
    },

    mounted () {
        this.options.length > 0 && this.render();
    },

    methods: {
        render (options = this.options) {
            options = Util.makeArray(options);

            if (!Array.isArray(options[0])) {
                options = [options];
            }

            let promises = options.map((data, key) => {
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
            
            setTimeout(() => {
                $scroll.scrollTo(-HEIGHT * index, duration || 400);
                this.vals.splice(level, 100000, data);

                if (data.children) {
                    this.renderColumns(data.children, level + 1);
                } else if (level < this.allData.length - 1) {
                    this.renderColumns(this.allData[level + 1], level + 1);
                }
                
                this.$emit('select', this.vals);
            }, 0)
        },

        listen (level) {
            let $scroll = this.$refs.scrolls[level];

            $scroll.$on('drag:end', (pos, target = pos, duration = 0) => {
                let list = this.renderLists[level];
                let index = Math.min(list.length - 1, Math.round(Math.abs(target) / HEIGHT));
                this.select(list[index], index, level, duration);
            });

            level === this.allData.length - 1 && setTimeout(() => this.$emit('scroll:ready'), 20);
        },

        isActived (item, index) {
            return this.vals[index] && item.value === this.vals[index].value;
        },

        onConfirm () {
            this.val = this.vals.map((item) => {
                return item.value;
            });

            this.$emit('confirm', this.val, this.vals);
            this.hide();
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
.vm-picker.vm-overlay {
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 10001;
    background: #f5f5f5;
}

.vm-picker-header {
    display: flex;
    height: 44px;
    background: #fff;
    font-size: 14px;
    justify-content: space-between;

    .vm-picker-title {
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

    .vm-picker-confirm {
        color: #7792cb;
    }
}

.vm-picker-inner {
    width: 100%;
    height: 175px;
    display: flex;
    background: #fff;
}

.vm-picker-column {
    flex-grow: 1;
}

.vm-picker-column-inner {
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