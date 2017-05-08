<template>
    <v-box :label="label">
        <img v-for="(photo, index) in photos" :src="photo.src" class="vmui-photo"/>
        <a href="javascript:;" class="vmui-photo-add" @change="_click">
            <input ref="file" class="vmui-photo-input" name="name" type="file"/>
        </a>
    </v-box>
</template>

<style>
  .vmui-photo{
      width: 1.09rem;
      height: 0.8rem;
      border-radius: 0.05rem;
      margin: 0.04rem 0.05rem 0.04rem 0;
  }

  .vmui-photo-add{
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

      .vmui-photo-input{
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

        photos: {
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
