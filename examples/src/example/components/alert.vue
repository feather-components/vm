<template>
    <page>
        <vm-topbar slot="header">alert组件</vm-topbar>
        <p style="text-align: center;"><btn @click="alert()" style="width: 80%; margin-top: 20px;">alert</btn></p>
        <p style="text-align: center;"><btn @click="confirm()" style="width: 80%; margin-top: 20px;">confirm</btn></p>
    </page>
</template>

<script>
import {
    Page,
    Topbar,
    Alert,
    Button as Btn
} from 'vm';

export default {
    components: {
        Page,
        Topbar,
        Btn
    },

    data () {
        return {
            visible: true
        };
    },

    methods: {
        alert () {
            this.$alert('hello，我是alert');
        },

        confirm () {
            let $confirm = this.$confirm('我是confirm，请点击确定', {
                buttonClick2hide: false
            });
            
            $confirm.$on('cancel', () => {
                this.$confirm('确定取消吗？').$on('confirm', () => {
                    $confirm.destroy();
                });
            }).$on('confirm', () => {
                this.$alert('你点击了确定');
                $confirm.destroy();
            })
        },

        defined (flex) {
            Alert('自定义alert', {
                extras: '说明文字',
                flex: flex,
                buttons: {
                    '按钮1': {
                        type: 'success',
                        callback () {
                            Alert('点击了按钮1');
                            this.destroy();
                        }
                    },
                    '按钮8': {
                        type: 'success',
                        callback () {
                            Alert('点击了按钮1');
                            this.destroy();
                        }
                    },
                    '按钮5': {
                        type: 'success',
                        callback () {
                            Alert('点击了按钮1');
                            this.destroy();
                        }
                    },
                    '按钮4': {
                        type: 'success',
                        callback () {
                            Alert('点击了按钮1');
                            this.destroy();
                        }
                    },
                    '按钮3': {
                        type: 'success',
                        callback () {
                            Alert('点击了按钮1');
                            this.destroy();
                        }
                    },
                    '按钮2' () {
                        Alert('点击了按钮2');
                        this.destroy();
                    }
                }
            });
        }
    }
};
</script>