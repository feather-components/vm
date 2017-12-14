import _Scroll from './scroll';
import _Pulldown2refresh from './pulldown2refresh';
import {Util} from '../../helper';

var Scroll = Util.register(_Scroll);
var Pulldown2refresh = Util.register(_Pulldown2refresh);

export default Scroll;
export {
	Scroll,
	Pulldown2refresh
}