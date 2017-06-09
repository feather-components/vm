/**
 * Created by EX-pengzhiliang001 on 2017-06-08.
 */
import SelectRender from './selectRender'

export default {
	bind(el, binding) {
		console.log(el, binding, 92929)
		el.addEventListener('click', () => {
			console.log(1312313)
			let re = new SelectRender()
			re.show()
		})
	}
}