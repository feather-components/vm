<template>
    <v-box :label="label" class="vmui-form-images">
        <grid>
            <grid-item v-for="(item, index) of val" :style="{width: percent}">
                :source="val"
                <div class="vmui-form-images-item">
                    <img :src="item" />
                    <a href="javascript:" class="vmui-form-images-del" v-if="delEnabled" @click="del(index)">删除</a>
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

<style>
.vmui-form-images{
    .vmui-grid{
        margin-top: 0px;
    }
}

.vmui-form-images-item{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100%;
    border: 1px dashed #eee;
    border-radius: 5px;
}

.vmui-form-images-item img{
    max-width: 100%;
    max-height: 100%;
}

.vmui-form-images-del{
    position: absolute;
    right: 0px;
    top: 0px;
    height: 0.2rem;
    line-height: 0.2rem;
    display: block;
    width: 30%;
    background: rgba(48, 48, 48, 0.5);
    color: #fff;
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
            default(imagess, data){
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

        onUploadComplete(imagess, data){
            var data = this.dataFormatter(imagess, data);

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
