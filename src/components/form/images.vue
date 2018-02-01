<template>
    <cell :label="label" class="vm-form-images" :veritcal-layout="true" :field-flex-layout="true">
        <template slot="label" v-if="$slots.label">
            <slot name="label"></slot>
        </template> 

        <template slot="tips" v-if="$slots.tips">
            <slot name="tips"></slot>
        </template> 

        <div class="vm-form-images-inner">
            <div class="vm-form-images-item" v-for="(item, index) of val">
                <slot name="item" :data="item">
                    <img :src="item" />
                </slot>

                <a href="javascript:" class="vm-form-images-del" v-if="delEnabled" @click="del(index)" >删除</a>
            </div>

            <div class="vm-form-images-item">
                <slot name="uploader">
                    <uploader 
                        :url="uploader || url" 
                        :multiple="rest > 1" 
                        :beforeUploadProcessor="beforeUploadProcessor"
                        :canUpload="canUpload"
                        accept="image/*"
                        @upload:start="onUploadStart" 
                        @upload:complete="onUploadComplete"
                        @upload:error="onUploadError"
                        @upload:progress="onUploadProgress"
                    ></uploader>
                </slot>
            </div>
        </div>
    </cell>
</template>

<style lang="less">
.vm-form-images-inner{
    display: flex;
    flex-wrap: wrap;
}

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
    margin-left: 0.12rem;
    background: #fafafa;
    margin-top: 0.08rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
}

.vm-form-images-item:nth-child(3n + 1){
    margin-left: 0px;
}

.vm-form-images-item img{
    max-width: 100%;
    max-height: 100%;
}

.vm-form-images-del{
    position: absolute;
    top: 0px;
    right: 0px;
    background: rgba(0, 0, 0, 0.7);
    width: 40%;
    height: 0.2rem;
    line-height: 0.2rem;
    text-align: center;
    text-decoration: none;
    color: #fff;
}
</style>

<script>
import Cell from "./cell";
import Uploader from '../uploader';
import _ from '../../helper';
import Toast from '../toast';
import {Multiable} from './abstract';

export default{
    name: 'images',

    mixins: [Cell, Multiable],

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
        },

        url: null,
        beforeUploadProcessor: null
    },

    components: {
        Cell,
        Uploader
    },

    computed: {
        rest(){
            return this.size == -1 ? 1000000 : Math.max(this.size - this.val.length, 0)
        }
    },

    methods:{
        canUpload(files){
            if(files.length > this.rest){
                this.$emit('limit', files, this.rest);
                return false;
            }

            return true;
        },

        onUploadStart(){
            this.$toast = Toast.loading('上传中', false, true);
        },

        onUploadProgress(images, event){
            this.$toast.setContent('已上传' + parseInt((event.loaded/event.total) * 100) + '%');
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
