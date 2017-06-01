<template>
    <v-box :label="label" class="vmui-file">
        <grid :cols="size == -1 || size > 3 ? 3 : size" :source="val">
            <template slot="cell" scope="props">
                <div class="vmui-file-item">
                    <slot :data="props.data" :index="props.index">
                        <img :src="props.data" />
                    </slot>
                    <a href="javascript:" class="vmui-file-del" v-if="delEnabled" @click="del(props.index)">删除</a>
                </div>
            </template>
            
            <uploader 
                v-if="rest" :url="uploader" :multiple="rest > 1" 
                @upload:start="onUploadStart" 
                @upload:complete="onUploadComplete"
                @upload:error="onUploadError"
                @upload:progress="onUploadProgress"
            ></uploader>

            <template slot="msg-left">
                <slot name="msg-left"></slot>
            </template>    

            <template slot="msg-right">
                <slot name="msg-right"></slot>
            </template>    
        </grid>
    </v-box>
</template>

<style>
.vmui-file{
    .vmui-grid{
        margin-top: 0px;
    }
}

.vmui-file-item{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100%;
    border: 1px dashed #eee;
    border-radius: 5px;
}

.vmui-file-item img{
    max-width: 100%;
    max-height: 100%;
}

.vmui-file-del{
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
import Grid from '../grid';
import Uploader from '../uploader';
import _ from '../helper';
import Toast from '../toast';
import {Multiable} from './abstract';

export default{
    mixins: [vBox, Multiable],

    props: {
        uploader: {
            type: String,
            default: ''
        },

        dataFormatter: {
            type: Function,
            default(files, data){
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
        Uploader
    },

    computed: {
        rest(){
            return this.size == -1 ? 1000000 : Math.max(this.size - this.val.length, 0)
        }
    },
    
    methods:{
        onUploadStart(){
            Toast.loading('上传中', false, true);
        },

        onUploadProgress(files, event){
            Toast.loading('已上传' + (event.loaded/event.total).toFixed(2) * 100 + '%', false, true);
        },

        onUploadComplete(files, data){
            var data = this.dataFormatter(files, data);

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
