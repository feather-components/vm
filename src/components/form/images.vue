<template>
    <v-box :label="label" class="vmui-form-images">
        <grid>
            <grid-item v-for="(item, index) of val" :style="{width: percent}">
                <div class="vmui-form-images-item">
                    <template name="item">
                        <img :src="item" />
                    </template>

                    <a href="javascript:" class="vmui-form-images-del" v-if="delEnabled" @click="del(index)">&times;</a>
                </div>
            </grid-item>

            <grid-item v-if="rest" :style="{width: percent}">
                <uploader 
                    :url="uploader" :multiple="rest > 1" 
                    @upload:start="onUploadStart" 
                    @upload:complete="onUploadComplete"
                    @upload:error="onUploadError"
                    @upload:progress="onUploadProgress"
                ></uploader>
            </grid-item>
        </grid>

        <template slot="msg-left">
            <slot name="msg-left"></slot>
        </template>    

        <template slot="msg-right">
            <slot name="msg-right"></slot>
        </template>    
    </v-box>
</template>

<style lang="less">
.vmui-form-images{
    .vmui-grid{
        margin-top: 0.12rem;
        margin-bottom: 0.05rem;
    }
}

.vmui-form-images-item{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 5px;
    margin: .04rem;
}

.vmui-form-images-item img{
    max-width: 100%;
    max-height: 100%;
}

.vmui-form-images-del{
    position: absolute;
    left: 0px;
    top: 0px;
    transform: translate(-25%, -25%);
    width: 0.2rem;
    height: 0.2rem;
    line-height: 0.2rem;
    display: block;
    color: #fff;
    border-radius: 100px;
    text-decoration: none;
    text-align: center;
    background: #F96854;
    font-size: 0.14rem;
}
</style>

<script>
import vBox from "./box";
import {Grid, GridItem} from '../grid';
import Uploader from '../uploader';
import _ from '../../helper';
import Toast from '../toast';
import {Multiable} from './abstract';

export default{
    name: 'images',

    mixins: [vBox, Multiable],

    props: {
        uploader: {
            type: String,
            default: ''
        },

        dataFormatter: {
            type: Function,
            default(images, data){
                return data;
            }
        },

        delEnabled: {
            type: Boolean,
            default: true
        }
    },

    components: {
        vBox,
        Grid,
        GridItem,
        Uploader
    },

    computed: {
        rest(){
            return this.size == -1 ? 1000000 : Math.max(this.size - this.val.length, 0)
        },

        percent(){
            return 100 * (this.size == -1 || this.size >=3 ? 0.3333 : 1/this.size) + '%';
        }
    },

    methods:{
        onUploadStart(){
            Toast.loading('上传中', false, true);
        },

        onUploadProgress(imagess, event){
            Toast.loading('已上传' + (event.loaded/event.total).toFixed(2) * 100 + '%', false, true);
        },

        onUploadComplete(images, data){
            var data = this.dataFormatter(images, data);

            if(data){
                this.save(data);
                Toast.success('上传成功');
            }else{
                Toast('上传失败');
            }
        },

        onUploadError(){
            Toast('网络请求错误');
        }
    }
}
</script>
