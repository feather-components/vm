<template>
    <div class="vm-search">
        <searchbar 
            :placeholder="placeholder" 
            :maxlength="maxlength" 
            :style="barSty"
            :inner-style="barInnerStyle"
            v-model="val"
            @input="onInput"
            @submit="submit" 
        >
            <a 
                href="javascript:" 
                class="vm-search-cancel" 
                @click="onCancel" 
                slot="right" 
            >
                取消
            </a>
        </searchbar>
        
        <scroll class="vm-search-panel">
            <historys :id="historyId" v-if="!val"  />

            <div class="vm-search-default" v-if="!empty2load && !val">
                <slot></slot>
            </div>  

            <div slot="rows">
                {{list}}
                <!-- <div v-for="(row, key) of list"></div> -->
            </div>
        </scroll>
    </div>
</template>

<script>
import Searchbar from '../searchbar';
import Scroll from '../scroll';
import Historys from './history';
import Model from '../../mixins/model';
import Config from '../../config';
import { Util } from '../../helper';

export default {
    name: 'search',
    mixins: [Model],

    components: {
        Searchbar,
        Historys,
        Scroll
    },

    props: {
        api: {
            type: Function,
            default: null
        },

        barStyle: {
            type: [String, Object],
            default: null
        },

        barInnerStyle: {
            type: [String, Object],
            default: null
        },

        maxlength: null,
        historyId: null,

        autofocus: {
            type: Boolean,
            default: false
        },

        cache: {
            type: Boolean,
            default: true
        },

        empty2load: {
            type: Boolean,
            default: false
        },

        closeAfterSelectHistory: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        barSty () {
            return this.barStyle || {
                background: Config('topbar.background') || Config('search.bar.background')
            };
        }
    },

    data () {
        var historys = [];

        try {
            historys = JSON.parse(localStorage.getItem('_vm_history_stores_.' + this.historyMark)) || [];
        } catch (e) {};

        return {
            caches: {},
            isEmpty: true,
            historys: historys,
            timeout: '',
            list: []
        };
    },

    methods: {
        onInput () {
            if (!this.empty2load && this.val) {
                return false;
            }

            if (this.caches[this.val]) {
                this.list = this.caches[this.val];
            } else {
                this.loadByRemote();
            }
        },

        loadByRemote: Util.debounce(function () {
            let val = this.val;

            Util.acm(this.api(this.val), this).then((list) => {
                this.caches[val] = this.list = list;
            });
        }, 300),

        submit () {
            var self = this;

            if (this.closeAfterSelectHistory) {
                self.cancel();
                self.addHistory();
                self.$emit('confirm', self.val);
            }
        },

        clickHistory (text) {
            this.val = text;
            this.submit();
        },

        clickClearHistory () {
            this.clearHistoryHandler(() => {
                this.clearHistory();
            });
        },

        clearHistory () {
            this.historys = [];
            this.storeHistory();
        },

        storeHistory () {
            localStorage.setItem('_vm_history_stores_.' + this.historyMark, JSON.stringify(this.historys));
        },

        addHistory (val = this.val) {
            var self = this;

            if (val && self.historys.indexOf(val) == -1) {
                self.historys.unshift(val);
                self.historys = self.historys.slice(0, 10);
                self.storeHistory();
            }
        },

        onCancel () {
            this.cancelHandler();
            this.$emit('cancel');
        }
    }
};
</script>

<style lang="less">
.vm-search-cancel {
    width: 32px;
    display: inline-block;
    text-decoration: none;
    color: #999;
    font-size: 14px;
    margin-left: 16px;
    font-weight: normal;
}

.vm-search {
    font-weight: normal;

    .vm-list-rows {
        margin-bottom: .3rem;
    }

    .vm-searchbar-inner {
        margin: 0px;
    }

    .vm-searchbar {
        padding-top: 0px;
        padding-bottom: 0px;
        padding-right: 0.45rem;
        box-sizing: border-box;
        width: 100%;
    }
}

.vm-search-panel {
    position: fixed;
    left: 0px;
    width: 100%;
}
</style>