<script>
import {Event, Dom} from '../../helper';
import Popup from '../popup';
import Overlay from '../overlay';

export default {
    mixins: [Popup],

    name: 'dropdown',

    data () {
        return {
            above: false,
            boxStyle: {}
        };
    },

    components: {
        Popup
    },

    computed: {
        pos () {
            return this.above ? 'bottom' : 'top';
        }
    },

    watch: {
        visibility (value) {
            value && this.resetPosition();
        }
    },

    mounted () {
        this.$nextTick(() => {
            Event.on(document.body, 'click', (e) => {
                !Dom.contains(this.$el, e.target) && this.hide();
            });
        });
    },

    methods: {
        onLabelClick () {
            // fixed android bug
            setTimeout(() => {
                this.toggle();
            }, 50);
        },

        onBoxBgClick (e) {
            e.stopPropagation();
            this.hide();
        },

        onBoxInnerClick (e) {
            e.target !== this.$refs.inner && e.stopPropagation();
        },

        toggle () {
            this.visibility ? this.hide() : this.show();
        },

        resetPosition () {
            const BODY_HEIGHT = Dom.height(document);
            const {top, height, bottom} = Dom.rect(this.$el);

            this.above = top + height > BODY_HEIGHT / 2;

            if (this.above) {
                this.boxStyle = {
                    bottom: BODY_HEIGHT - top,
                    height: top
                };
            } else {
                this.boxStyle = {
                    top: bottom,
                    height: BODY_HEIGHT - bottom
                };
            }
        }
    },

    render (h) {
        return h(
            'div', {
                class: 'vm-dropdown'
            },
            [
                h(
                    'div', {
                        class: 'vm-dropdown-label',
                        on: {
                            click: this.onLabelClick.bind(this)
                        }
                    },
                    [
                        this.$slots.default,
                        this.$scopedSlots.label ? this.$scopedSlots.label(this.visibility) : null,
                        this.visibility ? this.$slots['if-show'] : this.$slots['if-hide']
                    ]
                ),

                h(
                    Popup, {
                        class: 'vm-dropbox',
                        style: this.boxStyle,
                        props: {
                            visible: this.visibility,
                            position: this.pos,
                            clickBg2hide: this.clickBg2hide
                        },
                        nativeOn: {
                            click: this.onBoxBgClick.bind(this)
                        }
                    },
                    [
                        h(
                            'div', {
                                class: ['vm-dropbox-inner', `vm-dropbox-${this.pos}`],
                                on: {
                                    click: this.onBoxInnerClick.bind(this)
                                },
                                ref: 'inner'
                            },
                            [
                                this.$slots.box
                            ]
                        )
                    ]
                )
            ]
        );
    }
};
</script>

<style>
.vm-dropbox .vm-overlay{
    position: absolute;
}
</style>