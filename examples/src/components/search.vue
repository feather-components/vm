<template>
    <page>
        <search kw="wd"
            :api="api"
            history-id="history"
            :close-callback="cancel"
            :close-after-select-history="true"
            :clear-history-handler="onClearHistory"
            :empty2load="true"
            @select="select"
            @confirm="confirm"
            bar-style="background: blue;"
            bar-inner-style="background: #fff; border: 0px;"
        >
            <template scope="props" slot="row">
                <div class="row">{{props.data.q}}</div>
            </template>
        </search>
    </page>
</template>

<style scoped>
.row{
    font-size: 16px;
    padding: 10px 0px;
    border-bottom: 1px solid #eee;
}
</style>

<script>
import {
    Page,
    Topbar,
    Search,
    Toast
} from 'vm';
import Ajax from 'ajax';

export default {
    components: {
        Page,
        Topbar,
        Search,
        Toast
    },

    methods: {
        api (word) {
            console.log(word)
            return new Promise((resolve, reject) => {
                Ajax({
                    url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&cb=?',
                    data: {wd: word},
                    dataType: 'json',
                    success (data) {
                        console.log(data)
                        resolve(data.g);
                    },
                    error () {
                        reject();
                    }
                });
            });
        },

        formatter (data) {
            return data.g || [];
        },

        cancel () {
            history.back();
        },

        select (v) {
            Toast('select:' + JSON.stringify(v));
        },

        confirm (v) {
            Toast('confirm:' + v);
        },

        onClearHistory (clear) {
            if (window.confirm('确定清空？')) {
                clear();
            }
        }
    }
};
</script>