import Scroll from './components/scroll';
import List from './components/list';
import Page from './components/page';
import Topbar from './components/topbar';
import Button from './components/button';
import Alert from './components/alert';
import Toast from './components/toast';
import ActionSheet from './components/actionsheet';
import Dropdown from './components/dropdown';
import Draggable from './directives/draggable';
import Popover from './components/popover';
import Search from './components/search';
import Searchbar from './components/searchbar';
import Uploader from './components/uploader';
import {Grid, GridItem} from './components/grid';
import {Box, Radios, Checkboxes, TextInput, Select, Images, Counter, Switch} from './components/form';
import {Single, Multiple, Link, LinkMultiple} from './components/filter';
import Autosize from './directives/autosize';
import Mask from './components/mask';
import Overlay from './components/overlay';
import Helper from './helper';

import Vue from 'vue';

var Components = [
    Scroll,
    List,
    Page,
    Topbar,
    Button,
    Alert,
    Toast,
    ActionSheet,
    Dropdown,
    Draggable,
    Popover,
    Searchbar,
    Search,
    Uploader,
    GridItem,
    Grid,
    Box,
    Radios,
    Checkboxes,
    TextInput,
    Select,
    Images,
    Switch,
    Counter,
    Autosize,
    Mask,
    Overlay
];

function install(Vue){
    for(let Component of Components){
        Vue.use(Component);
    }
}

export {
    Search,
    Searchbar,
    Searchbar as SearchBar,
    Scroll,
    Page,
    Topbar,
    List,
    Alert,
    Button,
    Toast,
    ActionSheet,
    Dropdown,
    Draggable,
    Popover,
    Uploader,
    Grid,
    GridItem,
    Box as FormBox,
    Radios,
    Checkboxes,
    TextInput,
    Select,
    Switch,
    Images,
    Counter,
    Single as SingleFilter,
    Multiple as MultipleFilter,
    Link as LinkFilter,
    LinkMultiple as LinkMultipleFilter,
    Autosize,
    Mask,
    Overlay,
    Helper
};

export default {install};