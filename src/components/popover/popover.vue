<script>
import DropDown from '../dropdown';
import {Util, Event, Dom} from '../../helper';
import Config from '../../config';

export default {
    name: 'popover',

    props: {
        bgColor: {
            type: String,
            default: Config('popover.background') || Config('theme')
        },

        actionsGap: {
            type: String,
            default: Config('popover.actions-gap')
        },

        message: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            boxOffset: 0,
            arrowOffset: 0,
            isOpen: false
        };
    },

    computed: {
        boxStyle () {
            return {
                left: this.boxOffset + 'px',
                background: this.bgColor
            };
        },

        arrowStyle () {
            return {
                left: this.arrowOffset + 'px',
                borderColor: this.bgColor
            };
        }
    },

    methods: {
        onShow () {
            setTimeout(() => {
                const {width: boxWidth} = Dom.rect(this.$refs.box);
                const {width, left} = Dom.rect(this.$el);
                const BODY_WIDTH = Dom.width(document);

                let m = left + width / 2;
                let l = Math.min(
                    Math.max(m - boxWidth / 2, 5),
                    BODY_WIDTH - boxWidth - 5
                );

                this.boxOffset = l;
                this.arrowOffset = m - l;
                this.isOpen = true;
                this.$emit('show');
            });
        },

        onHide () {
            this.isOpen = false;
            this.$emit('hide');
        }
    },

    render (h) {
        const actions = (this.$slots.actions || []).filter((action) => {
            return !!action.tag;
        });
        const max = actions.length - 1;
        const AVNodes = actions.map((vnode, index) => {
            return h(
                'div', {
                    class: 'vm-popover-aw',
                    style: index != max ? `border-bottom: ${this.actionsGap}` : ''
                },
                [
                    vnode
                ]
            );
        });

        return h(
            DropDown,
            {
                class: 'vm-popover',
                on: {
                    show: this.onShow.bind(this),
                    hide: this.onHide.bind(this)
                }
            },
            [
                this.$slots.default,
                this.$scopedSlots.label ? this.$scopedSlots.label(this.isOpen) : null,

                h(
                    'div', {
                        class: 'vm-popover-box',
                        ref: 'box',
                        slot: 'box',
                        style: this.boxStyle
                    },

                    [
                        h(
                            'i', {
                                class: 'vm-popover-arrow',
                                style: this.arrowStyle
                            }
                        ),
                        
                        AVNodes.length ? AVNodes : (
                            this.$slots.box || 
                            h (
                                'span',
                                {   
                                    class: 'vm-popover-message',
                                    style: {
                                        color: Config('popover.actions-color')
                                    },
                                    domProps: {
                                        innerHTML: this.message
                                    }
                                }
                            )
                        )
                    ]
                )
            ]
        );
    }
};
</script>

<style>
.vm-popover .vm-popup {
    background: transparent !important;
}

.vm-popover .vm-popup .vm-overlay {
    text-align: initial;
}

.vm-popover-box {
    box-shadow: 0px 0px 10px #333;
    line-height: initial;
    font-weight: normal;
    border-radius: 3px;
    margin: 12px 0px;
    position: relative;
    z-index: 100000;
    display: inline-block;
}

.vm-dropbox-bottom .vm-popover-arrow {
    border-bottom-color: transparent !important;
    top: 100%;
    transform: translate(-8px, -10%);
}

.vm-dropbox-top .vm-popover-arrow {
    border-top-color: transparent !important;
}

.vm-popover-arrow {
    position: absolute;
    content: "";
    border-width: 8px;
    border-style: solid;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    height: 0px;
    width: 0px;
    display: inline-block;
    left: 50%;
    transform: translate(-8px, -90%);
}

.vm-popover-message {
    display: inline-block;
    padding: 10px;
}
</style>