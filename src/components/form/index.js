import Radios from './radios';
import Checkboxes from './checkboxes';
import TextInput from './text';
import Select from './select';
import Images from './image';
import Box from './box';
import {Util} from '../../helper';
import {Counter} from './directive';

Util.register(Radios);
Util.register(Checkboxes);
Util.register(TextInput);
Util.register(Select);
Util.register(Images);
Util.register(Box);
Util.register(Counter);

export {
    Radios,
    Checkboxes,
    TextInput,
    Select,
    Images,
    Box,
    Counter
};