<template>
    <div class="vm-search-history">
        <div class="vm-search-history-inner" v-show="historys.length">
            <div class="vm-search-history-header">
                {{title}}
                <a href="javascript:" @click="clear" class="vm-searcy-history-clear">
                    <slot name="clear">清除</slot>
                </a>
            </div>

            <div class="vm-search-historys">
                <a 
                    href="javascript:" 
                    v-for="(item, index) of historys" 
                    :key="index"
                    class="vm-search-history-item" 
                    @click="onHistoryClick(item)"
                >
                    <slot name="history" :data="item" :index="index">
                        {{item.length > 20 ? item.substring(0, 15) + '..' : item}}
                    </slot>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import {Util} from '../../helper';

const MAX = 10;

function id (id) {
    return `__vm__history__${id}`;
}

export default {
    props: {
        title: {
            type: String,
            default: '搜索记录'
        },

        id: {
            type: String,
            default () {
                if (location.hash) {
                    return location.hash.replace(/\?.*/, '');
                } 

                return location.pathname;
            }
        }
    },

    inject: ['_$search'],

    data () {
        return {
            historys: Util.storage(id(this.id)) || []
        };
    },

    mounted () {
        this._$search.$on('confirm', this.add.bind(this));
    },

    methods: {
        add (word) {
            if (!word.trim()) return false;

            this.historys.indexOf(word) == -1 && this.historys.push(word);
            this.save();
        },

        clear () {
            this.historys = [];
            this.save();
        },

        save () {
            Util.storage(
                id(this.id),
                this.historys = this.historys.slice(0, MAX)
            );
        },

        onHistoryClick(history) {
            this.$emit('select', history);
        }
    }
};
</script>

<style>
.vm-search-history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #999;
}

.vm-search-history-item {
    background: #eee;
    margin-right: 10px;
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    display: inline-block;
    padding: 0px 11px;
    text-decoration: none;
    font-size: 13px;
    color: #666;
}

.vm-searcy-history-clear {
    text-decoration: none;
    font-size: 12px;
    color: #999;
}
</style>