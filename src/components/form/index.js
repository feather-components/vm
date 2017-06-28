import Radios from './radios';
import Checkboxes from './checkboxes';
import TextInput from './text';
import Select from './select';
import Images from './images';
import Box from './box';
import Switch from './switch';
import {Util} from '../../helper';
import {Counter} from './directive';

Util.register(Radios);
Util.register(Checkboxes);
Util.register(TextInput);
Util.register(Select);
Util.register(Images);
Util.register(Box);
Util.register(Counter);
Util.register(Switch);

export {
    Radios,
    Checkboxes,
    TextInput,
    Select,
    Images,
    Box,
    Switch,
    Counter
};