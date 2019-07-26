<script>
import Config from '../../config';

export default {
    name: 'badge',

    props: {
        color: {
            type: String,
            default: Config('badge.color') || Config('theme')
        },

        text: {
            type: [Number, String]
        },
    },

    data () {
        return {
            txt: this.text
        };
    },

    watch: {
        text (text) {
            this.setText(text);
        }
    },

    methods: {
        setText (text) {
            this.txt = text;
        }
    },

    render (h) {
        return h(
            'span',
            {
                class: 'vm-badge',
                style: {
                    background: this.color
                }
            },
            [this.txt ? this.txt : this.$slots.default]
        );
    }
};
</script>

<style lang="less">
.vm-badge {
    color: #fff;
    display: inline-block;
    min-width: 18px;
    padding: 0px 7px;
    height: 32px;
    line-height: 32px;
    transform: scale(0.5);
    font-size: 20px;;
    text-align: center;
    border-radius: 100px;
}

.vm-badge:empty {
    width: 20px;
    min-width: 0px;
    height: 20px;
    padding: 0px;
}
</style>