/**
 * Created by EX-pengzhiliang001 on 2017-06-08.
 */
import Vue from  'vue'
import select from './select'

export default class SelectRender {
	constructor(el, binding) {
		this._vm = null
		this._el = el
		this._options = binding.value
	}

	show () {
		if (!document.querySelector('[vmui-select]')) {
			this.createElement('vmui-select')
		}

		let Select = Vue.extend(select)
		this._vm = new Select({
			propsData:{
				bindEl: this._el,
				selectList: this._options.selectList || [],
				onSure: this._options.onSure,
				connect: this._options.connect || '/',
				connectEvents: this._options.connectEvents || null,
				autoFill: this._options.autoFill || true,
				initValue: this._options.val || [],
				hideEvent:  this.destroy
			}
		}).$mount('[vmui-select]')

		return this
	}

	createElement(attr, tag) {
		let $d = document.createElement(tag || 'div')
		$d.setAttribute(attr, '')
		document.body.appendChild($d);
	}

	destroy() {
		this._options = null
		this._vm  = null
		this._el = null
	}
}
