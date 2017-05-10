<template>
    <a href="javascript:" class="vmui-uploader">
        <slot><i class="vmui-uploader-icon"></i></slot>
        <input type="file" class="vmui-uploader-input" @click="$emit('click')" @change="onSelect" ref="uploader" :multiple="multiple" />
    </a>
</template>

<style>
.vmui-uploader{
    display: inline-block;
    width: 100%;
    height: 100%;
    position: relative;
}

.vmui-uploader-input{
    display: block;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
}
</style>

<script>
import _ from '../helper';

var Uploader = {
    props: {
        multiple: {
            type: Boolean,
            default: false
        },

        param: {
            type: String,
            default: 'file'
        },

        url: {
            type: String,
            default: ''
        },

        beforeUploadProcessor: {
            type: Function,
            default(files){
                return files;
            }
        }
    },

    mounted(){
        this.files = [];
        this.xhr = null;
    },

    methods: {
        onSelect(){
            var files = [].slice.call(this.$refs.uploader.files);

            _.each(files, (file) => {
                file.url = Uploader.getUrl(file);
            });

            this.$emit('select', files);
            this.upload(files);
        },

        upload(files = []){
            files = this.beforeUploadProcessor(files);
            this.files = this.files.concat(files);
            this._upload();
        },

        _upload(){
            if(!this.files.length){
                return false;
            }

            var file = this.files.shift();

            this.$emit('upload:start', file);

            var formData = new FormData();
            formData.append(this.param, file);

            var xhr = this.xhr = new XMLHttpRequest;
            xhr.onload = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        var data = {};

                        try{
                            data = JSON.parse(xhr.responseText);
                        }catch(e){};

                        this.$emit('upload:complete', file, data);
                    }else{
                        this.$emit('upload:error', file, xhr.status);
                    }

                    this._upload();
                }  
            };
            xhr.upload.onprogress = (event) => {
                this.$emit('upload:progress', file, event);
            };
            xhr.open('post', this.url);
            xhr.send(formData);
        },

        abort(){
            this.xhr && this.xhr.abort();
            this.files.length = 0;
        }
    }
};

Uploader.getUrl = (() => {
    var url = window.URL || window.webkitURL;

    if(!url){
        return (file) => {return file.name};
    }

    return url.createObjectURL;
})();

export default Uploader;
</script>