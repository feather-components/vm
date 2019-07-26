import {Scroll, Pulldown2refresh} from './components/scroll';
import List from './components/list';
import Page from './components/page';
import Topbar from './components/topbar';
import Button from './components/button';
import Alert from './components/alert';
import Toast from './components/toast';
import {ActionSheet, ActionSheetItem} from './components/actionsheet';
import Dropdown from './components/dropdown';
import Draggable from './directives/draggable';
import {Popover, PopoverAction} from './components/popover';
import Popup from './components/popup';
import Search from './components/search';
import Searchbar from './components/searchbar';
import Uploader from './components/uploader';
import {Radios, Checkboxes, TextInput, Select, Images, Switch, Textarea, FormCell, DateInput} from './components/form';
import {Single, Multiple, Link, LinkMultiple} from './components/filter';
import Autosize from './directives/autosize';
import Masker from './components/masker';
import Iosselect from './components/iosselect';
import Datepicker from './components/datepicker';
import {Slider, SliderItem} from './components/slider';
import {SwipeOut, SwipeOutAction} from './components/swipeout';
import Forward from './components/forward';
import {Tabs, TabsPane} from './components/Tabs';
import {Box, Row} from './components/layout';
import Badge from './directives/badge';
import Segment from './components/segment';
import BadgeComponent from './components/badge';
import Loading from './components/loading';
import Tick from './components/tick';
import Helper from './helper';
import Lazyload from './directives/lazyload';
import Lightbox from './directives/lightbox';
import Config from './config';

var Components = [
    Loading,
    Tick,
    Segment,
    Box,
    Row,
    Badge,
    BadgeComponent,
    Forward,
    Tabs,
    TabsPane,
    Scroll,
    Pulldown2refresh,
    List,
    Page,
    Topbar,
    Button,
    Alert,
    Toast,
    ActionSheet,
    ActionSheetItem,
    Dropdown,
    Draggable,
    Popover,
    PopoverAction,
    Popup,
    Searchbar,
    Search,
    Uploader,
    Radios,
    Checkboxes,
    TextInput,
    DateInput,
    Textarea,
    Select,
    Images,
    FormCell,
    Switch,
    FormCell,
    Autosize,
    Masker,
    Iosselect,
    Datepicker,
    Slider,
    SliderItem,
    SwipeOut,
    SwipeOutAction,
    Lazyload,
    Lightbox
];

function install (Vue, options = {}) {
    for (let Component of Components) {
        Component.install(Vue);
    }

    Config(options);
}

export {
    Loading,
    Tick,
    Box,
    Segment,
    Row,
    Forward,
    Badge,
    Search,
    Searchbar,
    Searchbar as SearchBar,
    Tabs,
    TabsPane,
    Scroll,
    Pulldown2refresh,
    Page,
    Topbar,
    List,
    Alert,
    Button,
    Toast,
    ActionSheet,
    ActionSheetItem,
    Dropdown,
    Draggable,
    Popover,
    PopoverAction,
    Popup,
    Uploader,
    Radios,
    Checkboxes,
    TextInput,
    TextInput as Textinput,
    DateInput,
    DateInput as Dateinput,
    Textarea,
    Select,
    Switch,
    Images,
    FormCell,
    Single as SingleFilter,
    Multiple as MultipleFilter,
    Link as LinkFilter,
    LinkMultiple as LinkMultipleFilter,
    Autosize,
    Masker,
    Helper,
    Iosselect,
    Datepicker,
    Slider,
    SliderItem,
    SwipeOut,
    SwipeOut as Swipeout,
    SwipeOutAction,
    SwipeOutAction as SwipeoutAction,
    Lazyload,
    Lightbox
};

export default {install, Helper};