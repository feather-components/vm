<template>
<v-box :label="label" class="vmui-file">
    <template slot="msg-left" v-if="count != -1">
        {{value.length}}/{{count}}
    </template> 

    <grid :cols="count == -1 || count > 3 ? 3 : count" :source="value">
        <template slot="cell" scope="props">
            <div class="vmui-file-item">
                <slot :data="props.data" :index="props.index">
                    <img :src="props.data" />
                </slot>
                <a href="javascript:" class="vmui-file-del" v-if="delEnabled" @click="del(props.index)">删除</a>
            </div>
        </template>
        
        <uploader 
            v-if="rest" :url="url" :multiple="rest > 1" 
            @upload:start="onUploadStart" 
            @upload:complete="onUploadComplete"
            @upload:error="onUploadError"
            @upload:progress="onUploadProgress"
        ></uploader>
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

export default{
    props: {
        label: {
            type: String,
            default: null
        },

        name: {
            type: String,
            default(){
                return String(Date.now());
            }
        },

        size: {
            type: Number,
            default: -1
        },

        val: {
            type: [String, Array, Object],
            default(){
                return [];
            }
        },

        url: {
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

    data(){
        return {
            count: this.size < 1 ? -1 : this.size,
            value: _.makeArray(this.val)
        }
    },

    computed: {
        rest(){
            return this.count == -1 ? 1000000 : Math.max(this.count - this.value.length, 0)
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
                this.value = this.count > 1 ? this.value.concat(_.makeArray(data)) : [data];
                this.$emit('input', this.count > 1 ? this.value : this.value[0]);
                Toast.success('上传成功');
            }else{
                Toast('上传失败');
            }
        },

        onUploadError(){
            Toast('网络请求错误');
        },

        del(index){
            this.value.splice(index, 1);
        }
    }
}
</script>
