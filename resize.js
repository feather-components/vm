import _ from './helper';

export default {
    props: {
        fillHeight: {
            type: Boolean,
            default: true
        }
    },  

    mounted: function(){   
        window.addEventListener('resize', () => {
            this._resize_();
        });

        this._resize_();
    },

    methods: {
        _resize_(){
            if(this.style && this.style.height) return;

            var element = this.$el, parent = element.parentNode;
            var height, otherHeight = 0;

            element.style.height = 'auto';

            if(parent.style.height){
                height = _.height(parent);
            }else{
                height = _.height(document.documentElement) - _.offset(parent).top;
            }

            if(parent.style.maxHeight){
                height = Math.min(height, parseInt(parent.style.maxHeight));
            }

            if(!this.fillHeight){
                height = Math.min(_.height(element), height);
            }

            _.siblings(element).forEach((child) => otherHeight += _.height(child));
            element.style.height = height - otherHeight + 'px';
        }
    }
}