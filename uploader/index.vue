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
    min-height: 0.8rem;
    height: 100%;
    position: relative;
    background: #f3f3f3;
    border-radius: 0.04rem;

    &:before{
        width: 0.32rem;
        height: 0.05rem;
    }

    &:after{
        height: 0.32rem;
        width: 0.05rem;
    }

    &:before, &:after{
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        background:#fff;
    }
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

        usePack: {
            type: Boolean,
            default: true
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
        },

        canUpload: {
            type: Function,
            default(files){
                return true;
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

            if(!this.canUpload(files)){
                this.$emit('reject', files);
                return false;
            }

            this.files = this.files.concat(files);
            this._upload();
        },

        _upload(){
            var self = this, files = self.files;

            if(!files.length){
                return false;
            }

            if(!self.usePack){
                files = [self.files.shift()];
            }else{
                files = self.files.slice(0);
                self.clear();
            }

            self.$emit('upload:start', files);

            var formData = new FormData();

            files.forEach((file, key) => {
                formData.append('file' + key, file);
            });

            var xhr = self.xhr = new XMLHttpRequest;
            xhr.onload = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        var data = {};

                        try{
                            data = JSON.parse(xhr.responseText);
                        }catch(e){};

                        self.$emit('upload:complete', files, data);
                    }else{
                        self.$emit('upload:error', files, xhr.status);
                    }

                    this._upload();
                }  
            };
            xhr.upload.onprogress = (event) => {
                self.$emit('upload:progress', files, event);
            };
            xhr.open('post', self.url);
            xhr.send(formData);
        },

        abort(){
            this.xhr && this.xhr.abort();
            this.clear();
        },

        clear(){
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