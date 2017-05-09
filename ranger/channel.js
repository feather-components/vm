import Vue from 'vue'
import Draggable from '../draggable'
var vm = new Vue();
Vue.directive('draggable', Draggable)
export default vm;