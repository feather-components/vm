<template>
    <div class="vm-uploader">
        <slot><div class="vm-uploader-icon">╋</div></slot>
        <input 
            type="file" 
            class="vm-uploader-input" 
            :accept="accept" 
            @change="onSelect" 
            ref="uploader" 
            :multiple="multiple" 
        />
    </div>
</template>

<script>
import {Util} from '../../helper';
import Toast from '../toast';

var Uploader = {
    name: 'uploader',

    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        
        name: {
            type: String,
            default: null
        },

        accept: {
            type: String,
            default: '*'
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
            default (files, next) {
                return next(files);
            }
        },

        canUpload: {
            type: Function,
            default (files) {
                return true;
            }
        }
    },

    mounted () {
        this.files = [];
        this.xhr = null;
    },

    methods: {
        onSelect () {
            var self = this;
            var files = [].slice.call(self.$refs.uploader.files);

            Util.each(files, (file) => {
                file.url = Uploader.getUrl(file);
            });

            self.$emit('select', files);
            self.upload(files);
        },

        upload (files = []) {
            var self = this;

            self.beforeUploadProcessor(files, function (files) {
                if (!self.canUpload(files)) {
                    self.$emit('reject', files);
                    return false;
                }

                self.files = self.files.concat(files);
                self._upload();
            });
        },

        _upload () {
            var self = this; var files = self.files;

            if (!files.length) {
                return false;
            }

            if (!self.usePack) {
                files = [self.files.shift()];
            } else {
                files = self.files.slice(0);
                self.clear();
            }

            self.$emit('upload:start', files);

            var formData = new FormData();

            files.forEach((file, key) => {
                formData.append(this.name || ('file' + key), file);
            });

            for (let key in this.params) {
                formData.append(key, this.params[key]);
            }

            var xhr = self.xhr = new XMLHttpRequest();

            xhr.onload = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200 || xhr.status == 304) {
                        var data = {};

                        try {
                            data = JSON.parse(xhr.responseText);
                        } catch (e) {};

                        self.$emit('upload:complete', files, data);
                    }

                    this._upload();
                }
            };
            xhr.onerror = () => {
                self.$emit('upload:error', files, xhr.status);
            };
            xhr.upload.onprogress = (event) => {
                self.$emit('upload:progress', files, event);
            };
            xhr.open('post', self.url, true);
            xhr.send(formData);
        },

        abort () {
            this.xhr && this.xhr.abort();
            this.clear();
        },

        clear () {
            this.files.length = 0;
            this.$refs.uploader.value = '';
        }
    }
};

Uploader.getUrl = (() => {
    var url = window.URL || window.webkitURL;

    if (!url) {
        return (file) => { return file.name; };
    }

    return url.createObjectURL;
})();

export default Uploader;
</script>

<style lang="less">
.vm-uploader {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 4px;
}

.vm-uploader-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
}

.vm-uploader-input {
    display: block;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
}
</style>