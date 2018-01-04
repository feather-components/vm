<template>
    <page>
        <topbar slot="header">alert组件</topbar>
        <p style="text-align: center;"><btn @click="alert()" style="width: 80%; margin-top: 20px;">alert</btn></p>
        <p style="text-align: center;"><btn @click="confirm()" style="width: 80%; margin-top: 20px;">confirm</btn></p>
        <p style="text-align: center;"><btn @click="defined(true)" style="width: 80%; margin-top: 20px;">flex</btn></p>
        <p style="text-align: center;"><btn @click="defined()" style="width: 80%; margin-top: 20px;">自定义</btn></p>
    </page>
</template>

<script>
    import {
        Page,
        Topbar,
        Alert,
        Button as Btn
    } from 'vm';

    export default{
        components: {
            Page, 
            Topbar,
            Btn
        },

        methods: {
            alert(){
                Alert('我是alert');
            },

            confirm(){
                Alert.confirm('我是confirm，请点击确定', function(){
                    Alert('刚刚点击了确定');
                });
            },

            defined(flex){
                Alert('自定义alert', {
                    extras: '说明文字',
                    flex: flex,
                    buttons: {
                        '按钮1': {
                            type: 'success',
                            callback(){
                                Alert('点击了按钮1');
                                this.destroy();
                            }
                        },
                        '按钮8': {
                            type: 'success',
                            callback(){
                                Alert('点击了按钮1');
                                this.destroy();
                            }
                        },
                        '按钮5': {
                            type: 'success',
                            callback(){
                                Alert('点击了按钮1');
                                this.destroy();
                            }
                        },
                        '按钮4': {
                            type: 'success',
                            callback(){
                                Alert('点击了按钮1');
                                this.destroy();
                            }
                        },
                        '按钮3': {
                            type: 'success',
                            callback(){
                                Alert('点击了按钮1');
                                this.destroy();
                            }
                        },
                        '按钮2'(){
                            Alert('点击了按钮2');
                            this.destroy();
                        }
                    }
                });
            }
        }
    }
</script>