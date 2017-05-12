<template>
<v-box :label="label">
    <template slot="msg-left" v-if="count != -1">
        {{value.length}}/{{count}}
    </template> 

    <grid :columns="count == -1 || count > 3 ? 3 : count" :source="value">
        <template slot="cell" scope="props">
            <slot :data="props.data" :index="props.index">
                <img :src="props.data" />
            </slot>
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
                this.value = this.rest > 1 ? this.value.concat(_.makeArray(data)) : data;
                this.$emit('input', this.rest > 1 ? this.value : this.value[0]);
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
