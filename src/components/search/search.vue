<template>
    <div class="vm-search">
        <searchbar 
            :placeholder="placeholder" 
            :maxlength="maxlength" 
            :autofocus="autofocus"
            :style="barSty"
            :inner-style="barInnerStyle"
            v-model="val"
            ref="bar"
            @input="onInput"
            @submit="onConfirm" 
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
        
        <scroll>
            <div class="vm-search-panel">
                <historys :id="historyId"  v-show="!val" @select="onConfirm" />

                <slot></slot>

                <div slot="words" class="vm-search-words" v-show="words.length">
                    <div v-for="(word, index) of words" :key="index" class="vm-search-word">
                        <slot name="word" word="word" index="index">
                            <div @click="onConfirm(word)">{{word}}</div>
                        </slot>
                    </div>
                </div>
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
    
    model: {
        prop: 'value',
        event: 'confirm'
    },

    components: {
        Searchbar,
        Historys,
        Scroll
    },

    provide () {
        return {
            _$search: this
        };
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
        placeholder: null,
        autofocus: null,
        historyId: null,

        cache: {
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
        return {
            caches: {},
            words: []
        };
    },

    methods: {
        onInput () {
            if (this.val) {
                if (this.caches[this.val]) {
                    this.words = this.caches[this.val];
                } else {
                    this.fetch();
                }                           
            } else {
                this.words = [];
            }
            
            this.$emit('input', this.val);
        },

        fetch: Util.debounce(function () {
            let val = this.val;

            Util.acm(this.api(this.val), this).then((words) => {
                this.caches[val] = this.words = words || [];
            });
        }, 300),

        onConfirm (val) {
            this.$emit('confirm', this.val = val);
        },

        onCancel () {
            this.$emit('cancel');
        },

        focus () {
            setTimeout(() => {
                this.$refs.bar.focus();
            }, 300);
        },

        blur () {
            this.$refs.bar.blur();
        }
    }
};
</script>

<style lang="less">
.vm-search {
    background: #fff;
    width: 100%;
    height: 100%;
}

.vm-search-cancel {
    width: 32px;
    display: inline-block;
    text-decoration: none;
    margin-left: 16px;
    color: inherit;
}

.vm-search-panel {
    padding: 15px 16px;
}

.vm-search-word {
    padding: 10px 0px;
    border-bottom: 1px solid #eee;
}

.vm-search-word:nth-last-child(1) {
    border-bottom: 0px;
}
</style>