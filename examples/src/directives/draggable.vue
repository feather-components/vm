<template>
    <vm-page>
        <vm-topbar slot="header">draggable</vm-topbar>
        
        <br />
        <div class="container">
            <br />
            <div v-draggable @draging="onDrag1">任意拖动<br />{{d1}}</div>
            <br />
            <div v-draggable="{axis: 'x'}"  @draging="onDrag2">x轴拖动<br />{{d2}}</div>
            <br />
            <div v-draggable="{axis: 'y'}"  @draging="onDrag3">y轴拖动<br />{{d3}}</div>
        </div>
    </vm-page>
</template>

<style scoped>
    .container div{
        width: 200px;
        height: 100px;
        background: #eee;
    }
</style>

<script>
    export default {
    	data(){
            return {
                d1: '',
                d2: '',
                d3: ''
            }
        },

        methods: {
            onDrag1(pos){
                this.d1 = {
                    x: pos.data.x,
                    y: pos.data.y
                };
            },

            onDrag2(pos){
                this.d2 = {
                    x: pos.data.x,
                    y: pos.data.y
                };
            },

            onDrag3(pos){
                this.d3 = {
                    x: pos.data.x,
                    y: pos.data.y
                };
            }
        }
    }
</script>