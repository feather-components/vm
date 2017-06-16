import SelectRender from './selectRender'

export default {
	bind(el, binding) {
		el.addEventListener('click', () => {
			let re = new SelectRender(el, binding)
			re.show()
		})
	}
}