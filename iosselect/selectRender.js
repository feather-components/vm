/**
 * Created by EX-pengzhiliang001 on 2017-06-08.
 */
import Vue from  'vue'
import select from './select'

export default class SelectRender {
	constructor() {
		this._vm = null
	}

	show () {
		if (!document.querySelector('[vmui-select]')) {
			this.createElement('vmui-select')
		}
		let Select = Vue.extend(select)
		new Select({
			propsData:{

			}
		}).$mount('[vmui-select]')
	}

	hide () {

	}

	createElement(attr, tag) {
		let $d = document.createElement(tag || 'div')
		$d.setAttribute(attr, '')
		document.body.appendChild($d);
	}
}
