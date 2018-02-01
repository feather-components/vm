import {Util} from '../../helper';

export const Single = {
    props: {
        label: {
            type: String,
            default: null
        },

        name: {
            type: String,
            default(){
                return String(Date.now());
            }
        },

        value: null
    },

    data(){
        return {
            val: this.value
        }
    },

    watch: {
        val(v){
            this.$emit('input', v);
        },

        value(v){
            this.val = v;
        }
    }
};

export const Multiable = {
    props: Util.assign(Single, {
        size: {
            type: Number,
            default: -1
        },

        value: {
            type: Array,
            default(){
                return [];
            }
        }
    }),

    data(){
        return {
            val: Util.makeArray(this.value),
            multiable: this.size != 1
        };
    },

    watch: {
        val(v){
            this.$emit('input', !this.multiable ? v[0] : v);
        },

        value(v){
            this.val = Util.makeArray(v);
        }
    },

    methods: {
        save(v, merge = true){
            v = Util.makeArray(v);

            if(this.size == 1){
                merge = false;
            }

            if(!merge){
                this.val = v;
            }else{
                this.val = this.val.concat(v);
            }
        },

        del(index){
            if(index == null){
                this.val = [];
            }else{
                this.val.splice(index, 1);
            }
        }
    }
};