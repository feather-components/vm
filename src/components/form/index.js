import Radios from './radios';
import Checkboxes from './checkboxes';
import TextInput from './text';
import Textarea from './textarea'; 
import Select from './select';
import Images from './images';
import Switch from './switch';
import FormCell from './cell';
import DateInput from './date';
import {Util} from '../../helper';

Util.register(Radios);
Util.register(Checkboxes);
Util.register(TextInput);
Util.register(Textarea);
Util.register(Select);
Util.register(Images);
Util.register(Switch);
Util.register(FormCell);
Util.register(DateInput);

export {
	FormCell,
    Radios,
    Checkboxes,
    TextInput,
    Textarea,
    Select,
    Images,
    Switch,
    DateInput
};