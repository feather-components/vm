import Radios from './radios';
import Checkboxes from './checkboxes';
import TextInput from './text';
import Select from './select';
import File from './file';
import Box from './box';
import {Util} from '../../helper';
import {Counter} from './directive';

Util.register(Radios);
Util.register(Checkboxes);
Util.register(TextInput);
Util.register(Select);
Util.register(File);
Util.register(Box);
Util.register(Counter);

export {
    Radios,
    Checkboxes,
    TextInput,
    Select,
    File,
    Box,
    Counter
};