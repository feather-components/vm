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
		console.log(this._options.selectList, 64646)
		this._options.selectList = this._options.selectList.map((v, k) => {
			console.log(v!='', 812312)
			// return v != ''
			v = v.filter((v1, k) => {
				return v1 != ''
			})
			return v
		})
		console.log(this._options.selectList, 1111)

		let handleSelectList = () => {
			this._options.selectList.forEach((v, k) => {
				this._options.selectList[k].unshift({}, {})
				this._options.selectList[k].push({}, {})
			})
		}

		handleSelectList()

		console.log(this._options.selectList, 88888)

		if (!document.querySelector('[vmui-select]')) {
			this.createElement('vmui-select')
		}
		let Select = Vue.extend(select)
		new Select({
			propsData:{
				bindEl: this.el,
				selectList: this._options.selectList || [],
				onSure: this._options.onSure || () => {},
				connect: this._options.connect || '/'
			}
		}).$mount('[vmui-select]')

		handleSelectList = null

	}

	hide () {
		this._options = null
		this._vm.$destroy()
	}

	createElement(attr, tag) {
		let $d = document.createElement(tag || 'div')
		$d.setAttribute(attr, '')
		document.body.appendChild($d);
	}


}
