<template>
    <v-box :label="label" class="vm-form-images">
        <grid>
            <grid-item v-for="(item, index) of val">
                <div class="vm-form-images-item">
                    <slot name="item" :data="item">
                        <img :src="item" />
                    </slot>

                    <a href="javascript:" class="vm-form-images-del" v-if="delEnabled" @click="del(index)">&times;</a>
                </div>
            </grid-item>

            <grid-item v-if="rest">
                <uploader 
                    :url="uploader" :multiple="rest > 1" 
                    @upload:start="onUploadStart" 
                    @upload:complete="onUploadComplete"
                    @upload:error="onUploadError"
                    @upload:progress="onUploadProgress"
                ></uploader>
            </grid-item>
        </grid>
        
        <template slot="msg">
            <slot name="msg"></slot>
        </template>   
    </v-box>
</template>

<style lang="less">
.vm-form-images{
    .vm-grid{
        margin-top: 0.12rem;
        margin-bottom: 0.05rem;
    }

    .vm-grid-item{
        width: 1.09rem;
        height: 0.8rem;
        margin-left: 0.08rem;
        margin-bottom: 0.08rem;
    }

    .vm-grid-item:nth-child(3n + 1){
        margin-left: 0px;
    }
}

.vm-form-images-item{
    position: relative;
    width: 1.09rem;
    height: 0.8rem;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}

.vm-form-images-item img{
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

.vm-form-images-del{
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
    font-family: arial;
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

        wh(){
            return 100 * (this.size == -1 || this.size >=3 ? 0.3333 : 1/this.size) + '%';
        }
    },

    methods:{
        onUploadStart(){
            this.$toast = Toast.loading('上传中', false, true);
        },

        onUploadProgress(imagess, event){
            this.$toast.setContent('已上传' + (event.loaded/event.total).toFixed(2) * 100 + '%');
        },

        onUploadComplete(images, data){
            var data = this.dataFormatter(images, data);

            this.$toast = null;
            
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
