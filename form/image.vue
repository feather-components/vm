<template>
    <v-box :label="label">
        <img v-for="(image, index) in images" :src="image.src" class="vmui-image"/>
        <a href="javascript:;" class="vmui-image-add" @change="_click">
            <input ref="file" type="file" class="vmui-image-input" name="name" />
        </a>
    </v-box>
</template>

<style>
  .vmui-image{
      width: 1.09rem;
      height: 0.8rem;
      border-radius: 0.05rem;
      margin: 0.04rem 0.05rem 0.04rem 0;
  }

  .vmui-image-add{
      position: relative;
      display: inline-block;
      margin: 0.04rem 0;
      width: 1.09rem;
      height: 0.8rem;
      background: #f3f3f3;
      border-radius: 0.05rem;  
      vertical-align: top;

      &:before{
        content:"";
        display: block;
        width:0.21333rem;
        height:0.04rem;
        position: absolute;
        top:50%;
        left:50%;
        margin-top:-0.02rem;
        margin-left:-0.10666rem;
        background:#fff;
      }

      &:after{
        content:"";
        display: block;
        position: absolute;
        height:0.213333rem;
        width:0.04rem;
        top:50%;
        left:50%;
        margin-left:-0.02rem;
        margin-top:-0.10666rem;
        background:#fff;
      }

      .vmui-image-input{
          width: 1.09rem;
          height: 0.8rem;
          opacity: 0;
      }
  }
</style>

<script>
import vBox from "./box";

export default{
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

        images: {
          type: Array,
          default(){
            return []
          }
        }
    },

    components: {
        vBox
    },

    methods:{
        _click(){
            var inputDOM = this.$refs.file;
            this.file = inputDOM.files[0];
            this.$emit('input', this.file);
            this.$emit('select', this);
        }
    }
}
</script>
