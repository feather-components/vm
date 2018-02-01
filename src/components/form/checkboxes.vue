<script>
    import Radios from './radios';
    import {Multiable} from './abstract';

    export default{
        name: 'checkboxes',

        mixins: [Radios, Multiable],

        props: {
            unlimit: {
                type: [Number, String],
                default: -1
            }
        },

        methods:{
            onClick(v){
                if(this.unlimit === v){
                    this.save([this.unlimit], false);
                }else if(this.val.indexOf(this.unlimit) > -1){
                    this.save([v], false);
                }else{
                    var vals = this.val.slice(0);
                    var index = vals.indexOf(v);

                    if(index > -1){
                        vals.splice(index, 1);
                    }else{
                        vals.push(v);
                    }

                    this.save(vals, false);
                }
            },

            getClassName(v){
                return ['vm-form-tag', this.val.indexOf(v) > -1 ? this.selectedClassName : ''];
            }
        }
    }
</script>

