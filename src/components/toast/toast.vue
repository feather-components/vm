<script>
import Overlay from '../overlay';
import Popup from '../popup';
import Tick from '../tick';
import Loading from '../loading';
import Config from '../../config';

const Icons = Object.assign({
    success: Tick,
    loading: Loading
}, Config('toast.icons') || {});

export default {
    name: 'toast',

    mixins: [Overlay],

    props: {
        type: {
            type: String,
            default: null
        },

        message: {
            type: String,
            default: ''
        },

        masker: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            visibility: true
        };
    },

    render (h) {
        return h(
            this.masker ? Popup : Overlay,
            {
                class: 'vm-toast-container',
                props: {
                    position: 'center',
                    visible: this.visibility,
                    clickBg2hide: false
                }
            },
            [
                h(
                    'div',
                    {
                        class: 'vm-toast',
                    },
                    [
                        this.$scopedSlots.icon
                        || 
                            Icons[this.type] ? 
                                h(
                                    Icons[this.type],
                                    {
                                        props: {
                                            size: 25
                                        },

                                        style: {
                                            marginBottom: '5px'
                                        }
                                    }
                                ) 
                                : '',
                        h(
                            'div',
                            {
                                domProps: this.message ? {innerHTML: this.message} : null
                            },
                            [this.$slots.default]
                        )
                    ]
                )
            ]
        );
    }
};
</script>

<style>
.vm-toast {
    text-align: center;
    flex-direction: column;
    align-items: center;
    display: flex;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 28px;
    padding: 8px 15px;
    word-break: break-all;
    word-wrap: break-word;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
}
</style>