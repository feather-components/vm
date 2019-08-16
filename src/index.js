import './assets/base.css';

import Page from './components/page';
import {Box, Row} from './components/layout';
import Button from './components/button';
import TopBar from './components/topbar';
import Forward from './components/forward';
import Overlay from './components/overlay';
import Masker from './components/masker';
import Popup from './components/popup';
import {ActionSheet, ActionSheetItem} from './components/actionsheet';
import Modal from './components/modal';
import Toast from './components/toast';
import Segment from './components/segment';
import DropDown from './components/dropdown';
import {Popover, PopoverAction} from './components/popover';

import {Scroll, Pulldown2refresh} from './components/scroll';
import List from './components/list';

import Search from './components/search';
import SearchBar from './components/searchbar';

// import Uploader from './components/uploader';
import Input from './components/input';
import Switch from './components/switch';
import Textarea from './components/textarea';
import Image from './components/image';
import {Checker, IconChecker, CheckerGroup} from './components/checker';
import {Picker, TimePicker, DatePicker} from './components/picker';
import {FormRow} from './components/form';

// import {Single, Multiple, Link, LinkMultiple} from './components/filter';

import {Swiper, SwiperItem} from './components/swiper';
import {SwipeOut, SwipeOutAction} from './components/swipeout';
import {Tabs, TabsPane} from './components/Tabs';

import BadgeDirective from './directives/badge';
import Badge from './components/badge';

import Loading from './components/loading';
import Tick from './components/tick';

import Draggable from './directives/draggable';
import AutoSize from './directives/autosize';
// import Lazyload from './directives/lazyload';
// import Lightbox from './directives/lightbox';
import Config from './config';
import Helper from './helper';

var Components = [
    Page,
    Box,
    Row,
    Button,
    TopBar,
    Forward,
    Overlay,
    Masker,
    Popup,
    ActionSheet,
    ActionSheetItem,
    Modal,
    Toast,
    Segment,
    DropDown,
    Popover,
    PopoverAction,
    Scroll,
    Pulldown2refresh,
    List,
    Search,
    SearchBar,
    Input,
    Switch,
    Textarea,
    Image,
    Checker,
    IconChecker,
    CheckerGroup,
    Picker,
    TimePicker,
    DatePicker,
    FormRow,
    Swiper,
    SwiperItem,
    SwipeOut,
    SwipeOutAction,
    Tabs,
    TabsPane,
    Badge,
    Loading,
    Tick,
    Draggable,
    BadgeDirective,
    AutoSize,
];

function install (Vue, options = {}) {
    Helper.Util.$$ = Vue;

    for (let Component of Components) {
        Component.install(Vue);
    }

    Config(options);
}

export {
    Page,
    Box,
    Row,
    Button,
    TopBar,
    Forward,
    Overlay,
    Masker,
    Popup,
    ActionSheet,
    ActionSheetItem,
    Modal,
    Toast,
    Segment,
    DropDown,
    Popover,
    PopoverAction,
    Scroll,
    Pulldown2refresh,
    List,
    Search,
    SearchBar,
    Input,
    Switch,
    Textarea,
    Image,
    Checker,
    IconChecker,
    CheckerGroup,
    Picker,
    TimePicker,
    DatePicker,
    FormRow,
    Swiper,
    SwiperItem,
    SwipeOut,
    SwipeOutAction,
    Tabs,
    TabsPane,
    Badge,
    Loading,
    Tick,

    Draggable,
    BadgeDirective,
    AutoSize,
    Helper
};

export default {install, Helper};