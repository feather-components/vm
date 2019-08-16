<template>
    <popup position="center" v-model="visibility">
        <div class="vm-modal">
            <div class="vm-modal-title" v-if="title || $slots.title">
                <slot name="title">{{title}}</slot>
            </div>

            <div class="vm-modal-content">
                <slot>{{message}}</slot>
            </div>

            <div class="vm-modal-buttons">
                <btn 
                    class="vm-modal-cancel" 
                    v-if="cancelButton" 
                    hollow
                    type="#333"
                    @click="onCancel"
                >
                    {{cancelButton}}
                </btn>

                <btn 
                    class="vm-modal-confirm" 
                    :style="confirmStyle"
                    @click="onConfirm"
                    hollow
                >
                    {{confirmButton}}
                </btn>
            </div>
        </div>
    </popup>
</template>

<script>
import Popup from '../popup';
import Button from '../button';
import Config from '../../config';

export default {
    name: 'modal',
    
    mixins: [Popup],
    
    components: {
        Popup,
        Btn: Button
    },

    props: {
        title: {
            type: String,
            default: ''
        },

        message: {
            type: String,
            default: ''
        },

        confirmButton: {
            type: String,
            default: '确定'
        },

        cancelButton: {
            type: String,
            default: ''
        },

        buttonClick2hide: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            confirmStyle: {
                color: Config('theme')
            }
        };
    },

    methods: {
        onConfirm () {
            this.$emit('confirm');
            this.buttonClick2hide && this.hide();
        },

        onCancel () {
            this.$emit('cancel');
            this.buttonClick2hide && this.hide();
        }
    }
};
</script>

<style>
.vm-modal {
    width: 70%;
    margin: auto;
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
}

.vm-modal-title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid #eee;
}

.vm-modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;

}

.vm-modal-buttons {
    border-top: 1px solid #eee;
    display: flex;
}

.vm-modal-cancel, .vm-modal-confirm {
    height: 40px !important;
    flex: 1;
    font-size: 14px;
    border-radius: 0px !important;
    border: 0px !important;
}

.vm-modal-cancel {
    border-right: 1px solid #eee !important;
}
</style>