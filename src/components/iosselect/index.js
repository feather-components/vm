/**
 * Created by EX-pengzhiliang001 on 2017-06-08.
 */
import SelectRender from './selectRender'

export default {
	update() {
			console.log(9876543)
	},

	bind(el, binding) {
		// console.log(el, binding, 92929)

		el.addEventListener('click', () => {
			// setInterval(() => {
			// 	console.log(binding.value.set(binding.value.selectList), 888)
			// }, 50)

			setTimeout(() => {
				console.log(binding)
			}, 5000)

			let re = new SelectRender(el, binding)

			re.show()

		})
	}
}