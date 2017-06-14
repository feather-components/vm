/**
 * Created by EX-pengzhiliang001 on 2017-06-08.
 */
import Vue from  'vue'
import select from './select'

export default class SelectRender {
	constructor(el, binding) {
		this._vm = null
		this.el = el
		this._options = binding.value
	}

	show () {
		// if (this._options.loop) {
		// 	setInterval(() => {
		//
		// 	}, 50)
		// }


		this._options.selectList = this._options.selectList.map((v, k) => {
			v = v.filter((v1, k) => {
				return Object.keys(v1).length != 0
			})
			return v
		})

		let handleSelectList = () => {
			this._options.selectList.forEach((v, k) => {
				this._options.selectList[k].unshift({}, {})
				this._options.selectList[k].push({}, {})
			})
		}

		handleSelectList()

		if (!document.querySelector('[vmui-select]')) {
			this.createElement('vmui-select')
		}
		let Select = Vue.extend(select)
		this._vm = new Select({
			propsData:{
				bindEl: this.el,
				selectList: this._options.selectList || [],
				onSure: this._options.onSure || () => {},
				connect: this._options.connect || '/',
				loopEvent: this._options.loopEvent || () => {}
			}
		}).$mount('[vmui-select]')

		// handleSelectList = null

		return this
	}

	hide () {
		this._options = null
		console.log(this._options, 444)
		clearInterval(this._options.interVal)
		this._vm.$destroy()
	}

	createElement(attr, tag) {
		let $d = document.createElement(tag || 'div')
		$d.setAttribute(attr, '')
		document.body.appendChild($d);
	}




}
