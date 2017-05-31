import _ from './helper';

export default{
    props: {
        fillHeight: {
            type: Boolean,
            default: true
        }
    },  

    data(){
        return {
            fillSize: this.fillHeight
        };
    },

    mounted: function(){   
        window.addEventListener('resize', () => {
            this._resize_();
        });

        if(this.$el.style.height && (!this.style || !this.style.height)){
            this._height = this.$el.style.height;
        }

        this.$el.$resize = this;

        setTimeout(() => {
            this._resize_();
        }, 10);
    },

    methods: {
        _resize_(){
            if(this.style && this.style.height || this._height) return;

            var element = this.$el, parent = element.parentNode;
            var height, otherHeight = 0, selfTop = _.offset(element).top;

            element.style.height = 'auto';

            if(parent.style.height){
                height = _.height(parent);
            }else{
                height = _.height(document.documentElement) - _.offset(parent).top;
            }

            if(_.css(parent, 'max-height')){
                height = Math.min(height, parseFloat(parent.style.maxHeight));
            }

            if(!this.fillSize){
                height = Math.min(_.height(element), height);
            }else{
                _.siblings(element).forEach((child) => _.offset(child).top != selfTop && (otherHeight += _.height(child)));
                height -= otherHeight;
            }

            element.style.height = height + 'px';
            this.$emit('resize');
        }
    }
}

export const resize = (element) => {
    element.$resize && element.$resize._resize_();

    _.each(_.$$('*', element), (element) => {
        element.$resize && element.$resize._resize_();
    });
}
