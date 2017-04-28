<template>
    <v-box :label="label"> 
        <select class="vmui-select" :name="name" v-model="selected">
            <option value='' disabled selected style="display:none;color:#E1E1E1">{{ph}}</option>
            <option v-for="(option, index) in options" :value="option.value" v-text="option.label" ></option>
        </select> 
        <span class="lm-select-icon icon iconfont icon-right"></span>
    </v-box>
</template>

<style>
.vmui-select{   
    width: 100%;
    font-size: .16rem;
    // color: #222222;
    color:#E1E1E1;
    line-height: .28rem;
    margin-bottom: .08rem;
    border: 0;
    -webkit-appearance: none;

    &:focus{
        outline: none;
        border: none;
    }
}

@font-face {font-family: "iconfont";
  src: url('icon/iconfont.eot?t=1491440240409'); /* IE9*/
  src: url('icon/iconfont.eot?t=1491440240409#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('icon/iconfont.woff?t=1491440240409') format('woff'), /* chrome, firefox */
  url('icon/iconfont.ttf?t=1491440240409') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('icon/iconfont.svg?t=1491440240409#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:14px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.lm-select-icon{
    display: inline-block;
    position: absolute;
    right: 0.16rem;
    bottom: 0.12rem;
    color: #878787;
    z-index: 1;
}

.icon-right:before { 
    content: "\e607"; 
}

</style>

<script>
import vBox from "./box"

export default{
    name: 'v-input',

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

        options: {
            type: Array,
            required: true
        },

        ph: {
            type: String,
            default: null
        },

        selected: {
            type: [String, Array],
            default: null
        },

        val: {
            type: [String, Array],
            default: null
        }
    },

    data() {
        return {
            result : null
        };
    },

    components: {
        vBox
    },

    watch: {
        selected(v) {
            this._select(v);   
        }
    },

    created(){
        this._select();
    },

    methods:{
        _select(v = this.val){
            this.result = this.selected = v;
            this.$emit('input', this.result);
            this.$emit('change', this.result);
        }
    }
}
</script>